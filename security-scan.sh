#!/bin/bash
# ================================================================================
# SECURITY SCAN SCRIPT
# Detects exposed API keys, secrets, and sensitive data in codebase
# ================================================================================

set -e

# ============================================
# COLOR DEFINITIONS
# ============================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# ============================================
# COUNTERS
# ============================================
HIGH_RISK=0
MEDIUM_RISK=0
LOW_RISK=0
FILES_SCANNED=0
ISSUES_FOUND=0

# ============================================
# HELPER FUNCTIONS
# ============================================
print_header() {
    echo ""
    echo -e "${PURPLE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}  ${WHITE}${BOLD}$1${NC}"
    echo -e "${PURPLE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_high() {
    echo -e "${RED}[HIGH]${NC} $1"
    ((HIGH_RISK++))
    ((ISSUES_FOUND++))
}

print_medium() {
    echo -e "${YELLOW}[MEDIUM]${NC} $1"
    ((MEDIUM_RISK++))
    ((ISSUES_FOUND++))
}

print_low() {
    echo -e "${BLUE}[LOW]${NC} $1"
    ((LOW_RISK++))
    ((ISSUES_FOUND++))
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${CYAN}ℹ${NC} $1"
}

# ============================================
# CONFIGURATION
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Files/directories to exclude from scanning
EXCLUDE_PATTERNS=(
    "node_modules"
    ".git"
    ".next"
    "dist"
    "build"
    ".env.example"
    ".env.*.example"
    "*.md"
    "security-scan.sh"
    "setup-env.sh"
    ".env-backups"
    "package-lock.json"
    "yarn.lock"
    "pnpm-lock.yaml"
)

# Build exclude arguments for grep/find
build_exclude_args() {
    local args=""
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        args="$args --exclude=$pattern --exclude-dir=$pattern"
    done
    echo "$args"
}

# ============================================
# API KEY PATTERNS
# ============================================
declare -A KEY_PATTERNS=(
    # OpenAI
    ["OpenAI API Key"]="sk-[a-zA-Z0-9]{20,}"
    ["OpenAI Project Key"]="sk-proj-[a-zA-Z0-9_-]{20,}"

    # Anthropic
    ["Anthropic API Key"]="sk-ant-api[a-zA-Z0-9_-]{20,}"

    # Google
    ["Google API Key"]="AIza[a-zA-Z0-9_-]{35}"
    ["Google OAuth ID"]="\\.apps\\.googleusercontent\\.com"

    # GitHub
    ["GitHub Personal Token"]="ghp_[a-zA-Z0-9]{36}"
    ["GitHub OAuth Token"]="gho_[a-zA-Z0-9]{36}"
    ["GitHub App Token"]="ghu_[a-zA-Z0-9]{36}"
    ["GitHub Refresh Token"]="ghr_[a-zA-Z0-9]{36}"

    # AWS
    ["AWS Access Key ID"]="AKIA[A-Z0-9]{16}"
    ["AWS Secret Key"]="[a-zA-Z0-9/+=]{40}"

    # Stripe
    ["Stripe Secret Key"]="sk_live_[a-zA-Z0-9]{24,}"
    ["Stripe Test Key"]="sk_test_[a-zA-Z0-9]{24,}"
    ["Stripe Publishable Key"]="pk_live_[a-zA-Z0-9]{24,}"
    ["Stripe Webhook Secret"]="whsec_[a-zA-Z0-9]{24,}"

    # Supabase
    ["Supabase Key"]="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\\.[a-zA-Z0-9_-]{100,}"

    # Vercel
    ["Vercel Token"]="[a-zA-Z0-9]{24}"

    # SendGrid
    ["SendGrid API Key"]="SG\\.[a-zA-Z0-9_-]{22}\\.[a-zA-Z0-9_-]{43}"

    # Twilio
    ["Twilio Auth Token"]="[a-f0-9]{32}"

    # Slack
    ["Slack Bot Token"]="xoxb-[0-9]{10,13}-[0-9]{10,13}-[a-zA-Z0-9]{24}"
    ["Slack Webhook"]="https://hooks\\.slack\\.com/services/[A-Z0-9]{9,}/[A-Z0-9]{9,}/[a-zA-Z0-9]{24}"

    # Discord
    ["Discord Bot Token"]="[MN][A-Za-z0-9]{23,}\\.[A-Za-z0-9-_]{6}\\.[A-Za-z0-9-_]{27}"
    ["Discord Webhook"]="https://discord(app)?\\.com/api/webhooks/[0-9]+/[a-zA-Z0-9_-]+"

    # Firebase
    ["Firebase Key"]="AAAA[a-zA-Z0-9_-]{7}:[a-zA-Z0-9_-]{140}"

    # NPM
    ["NPM Token"]="npm_[a-zA-Z0-9]{36}"

    # PyPI
    ["PyPI Token"]="pypi-[a-zA-Z0-9]{60,}"

    # Mailgun
    ["Mailgun API Key"]="key-[a-f0-9]{32}"

    # Postmark
    ["Postmark API Key"]="[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"

    # Generic patterns
    ["Private Key Block"]="-----BEGIN (RSA |DSA |EC |OPENSSH )?PRIVATE KEY-----"
    ["Generic API Key"]="api[_-]?key['\"]?\\s*[:=]\\s*['\"]?[a-zA-Z0-9_-]{20,}"
    ["Generic Secret"]="secret[_-]?key['\"]?\\s*[:=]\\s*['\"]?[a-zA-Z0-9_-]{20,}"
    ["Password in URL"]="://[^:]+:[^@]+@"
    ["Bearer Token"]="[Bb]earer\\s+[a-zA-Z0-9_-]{20,}"
)

# ============================================
# SCANNING FUNCTIONS
# ============================================

scan_for_pattern() {
    local name="$1"
    local pattern="$2"
    local severity="$3"

    # Use grep with extended regex
    local results
    results=$(grep -rn -E "$pattern" "$SCRIPT_DIR" \
        --include="*.js" \
        --include="*.ts" \
        --include="*.jsx" \
        --include="*.tsx" \
        --include="*.json" \
        --include="*.yml" \
        --include="*.yaml" \
        --include="*.env" \
        --include="*.config" \
        --include="*.conf" \
        --include="*.py" \
        --include="*.rb" \
        --include="*.go" \
        --include="*.java" \
        --include="*.php" \
        --include="*.sh" \
        --exclude-dir=node_modules \
        --exclude-dir=.git \
        --exclude-dir=.next \
        --exclude-dir=dist \
        --exclude-dir=build \
        --exclude-dir=.env-backups \
        --exclude="*.example" \
        --exclude="*.md" \
        --exclude="security-scan.sh" \
        --exclude="setup-env.sh" \
        --exclude="ENV_README.md" \
        2>/dev/null || true)

    if [ -n "$results" ]; then
        case "$severity" in
            "high")
                print_high "$name found:"
                ;;
            "medium")
                print_medium "$name found:"
                ;;
            "low")
                print_low "$name found:"
                ;;
        esac

        echo "$results" | head -5 | while read -r line; do
            echo "    $line"
        done

        local count
        count=$(echo "$results" | wc -l)
        if [ "$count" -gt 5 ]; then
            echo "    ... and $((count - 5)) more occurrences"
        fi
        echo ""
    fi
}

scan_api_keys() {
    print_header "Scanning for API Keys & Secrets"

    # High severity patterns
    scan_for_pattern "OpenAI API Key" "sk-[a-zA-Z0-9]{20,}" "high"
    scan_for_pattern "OpenAI Project Key" "sk-proj-[a-zA-Z0-9_-]{20,}" "high"
    scan_for_pattern "Anthropic API Key" "sk-ant-api[a-zA-Z0-9_-]{20,}" "high"
    scan_for_pattern "Google API Key" "AIza[a-zA-Z0-9_-]{35}" "high"
    scan_for_pattern "GitHub Token" "gh[pousr]_[a-zA-Z0-9]{36}" "high"
    scan_for_pattern "AWS Access Key" "AKIA[A-Z0-9]{16}" "high"
    scan_for_pattern "Stripe Secret Key" "sk_(live|test)_[a-zA-Z0-9]{24,}" "high"
    scan_for_pattern "Private Key" "-----BEGIN (RSA |DSA |EC |OPENSSH )?PRIVATE KEY-----" "high"

    # Medium severity patterns
    scan_for_pattern "Supabase JWT" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]{50,}" "medium"
    scan_for_pattern "SendGrid API Key" "SG\.[a-zA-Z0-9_-]{22}\.[a-zA-Z0-9_-]{43}" "medium"
    scan_for_pattern "Slack Token" "xox[baprs]-[0-9]+" "medium"
    scan_for_pattern "Discord Token" "https://discord(app)?\.com/api/webhooks" "medium"
    scan_for_pattern "Password in URL" "://[^:]+:[^@]+@" "medium"

    # Low severity patterns
    scan_for_pattern "Generic API Key variable" "api[_-]?key['\"]?\s*[:=]\s*['\"][a-zA-Z0-9]" "low"
    scan_for_pattern "Generic Secret variable" "secret['\"]?\s*[:=]\s*['\"][a-zA-Z0-9]" "low"
}

check_env_files() {
    print_header "Checking Environment Files"

    # Check if .env exists and has real values (not placeholders)
    if [ -f "$SCRIPT_DIR/.env" ]; then
        print_info "Found .env file - checking for real credentials..."

        # Check for common real credential patterns
        if grep -q "sk-proj-[A-Za-z0-9]" "$SCRIPT_DIR/.env" 2>/dev/null; then
            print_high "Real OpenAI key detected in .env"
        fi

        if grep -q "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\." "$SCRIPT_DIR/.env" 2>/dev/null; then
            if ! grep -q "your-supabase" "$SCRIPT_DIR/.env" 2>/dev/null; then
                print_high "Real Supabase JWT detected in .env"
            fi
        fi

        if grep -qE "AKIA[A-Z0-9]{16}" "$SCRIPT_DIR/.env" 2>/dev/null; then
            if ! grep -q "your-access-key" "$SCRIPT_DIR/.env" 2>/dev/null; then
                print_high "Real AWS Access Key detected in .env"
            fi
        fi
    else
        print_success "No .env file found (good - should not be committed)"
    fi

    # Check for .env.local
    if [ -f "$SCRIPT_DIR/.env.local" ]; then
        print_info ".env.local exists - ensure it's in .gitignore"
    fi

    # Check for other env files that shouldn't exist
    for envfile in .env.production .env.staging .env.development; do
        if [ -f "$SCRIPT_DIR/$envfile" ]; then
            print_medium "$envfile exists - ensure it's in .gitignore"
        fi
    done
}

check_git_tracking() {
    print_header "Checking Git Status"

    if [ ! -d "$SCRIPT_DIR/.git" ]; then
        print_info "Not a git repository - skipping git checks"
        return
    fi

    # Check if .env is tracked
    if git -C "$SCRIPT_DIR" ls-files --error-unmatch .env &>/dev/null; then
        print_high ".env is tracked in git! Run: git rm --cached .env"
    else
        print_success ".env is not tracked in git"
    fi

    # Check if .env.local is tracked
    if git -C "$SCRIPT_DIR" ls-files --error-unmatch .env.local &>/dev/null; then
        print_high ".env.local is tracked in git! Run: git rm --cached .env.local"
    fi

    # Check git history for secrets (last 50 commits)
    print_info "Scanning recent git history for secrets..."

    local history_secrets
    history_secrets=$(git -C "$SCRIPT_DIR" log -50 --all -p 2>/dev/null | grep -E "(sk-[a-zA-Z0-9]{20,}|AKIA[A-Z0-9]{16}|-----BEGIN .* PRIVATE KEY-----)" | head -5 || true)

    if [ -n "$history_secrets" ]; then
        print_high "Secrets found in git history!"
        echo "    Consider using git-filter-repo or BFG Repo-Cleaner to remove them"
        echo "    Then rotate all affected credentials"
    else
        print_success "No obvious secrets in recent git history"
    fi
}

check_gitignore() {
    print_header "Checking .gitignore Configuration"

    if [ ! -f "$SCRIPT_DIR/.gitignore" ]; then
        print_high "No .gitignore file found!"
        return
    fi

    # Required patterns
    local required_patterns=(
        ".env"
        "*.pem"
        "*.key"
        "node_modules"
    )

    for pattern in "${required_patterns[@]}"; do
        if grep -q "$pattern" "$SCRIPT_DIR/.gitignore"; then
            print_success "$pattern is in .gitignore"
        else
            print_medium "$pattern should be in .gitignore"
        fi
    done
}

scan_for_hardcoded_urls() {
    print_header "Checking for Hardcoded Production URLs"

    # Look for production URLs in code
    local prod_patterns=(
        "https://.*\.supabase\.co"
        "https://.*\.ghost\.io"
        "https://.*\.vercel\.app"
        "https://.*\.netlify\.app"
    )

    for pattern in "${prod_patterns[@]}"; do
        local results
        results=$(grep -rn "$pattern" "$SCRIPT_DIR" \
            --include="*.js" \
            --include="*.ts" \
            --include="*.jsx" \
            --include="*.tsx" \
            --exclude-dir=node_modules \
            --exclude-dir=.git \
            --exclude="*.example" \
            --exclude="*.md" \
            2>/dev/null | head -3 || true)

        if [ -n "$results" ]; then
            print_low "Hardcoded URL pattern found: $pattern"
            echo "$results" | while read -r line; do
                echo "    $line"
            done
        fi
    done
}

count_files() {
    FILES_SCANNED=$(find "$SCRIPT_DIR" -type f \
        \( -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" \
        -o -name "*.json" -o -name "*.yml" -o -name "*.yaml" \
        -o -name "*.env*" -o -name "*.config" -o -name "*.conf" \
        -o -name "*.py" -o -name "*.rb" -o -name "*.go" \) \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/.next/*" \
        -not -path "*/dist/*" \
        -not -path "*/build/*" \
        2>/dev/null | wc -l)
}

print_summary() {
    print_header "Scan Summary"

    echo -e "${WHITE}Files scanned:${NC} $FILES_SCANNED"
    echo ""
    echo -e "${WHITE}Issues found:${NC}"
    echo -e "  ${RED}HIGH:${NC}   $HIGH_RISK"
    echo -e "  ${YELLOW}MEDIUM:${NC} $MEDIUM_RISK"
    echo -e "  ${BLUE}LOW:${NC}    $LOW_RISK"
    echo -e "  ${WHITE}TOTAL:${NC}  $ISSUES_FOUND"
    echo ""

    if [ "$HIGH_RISK" -gt 0 ]; then
        echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${RED}║  CRITICAL: High-risk secrets detected!                         ║${NC}"
        echo -e "${RED}║  Do NOT commit these files until issues are resolved.          ║${NC}"
        echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
        exit 1
    elif [ "$MEDIUM_RISK" -gt 0 ]; then
        echo -e "${YELLOW}⚠ Medium-risk issues found. Review and address before deployment.${NC}"
        exit 0
    else
        echo -e "${GREEN}✓ No critical security issues detected.${NC}"
        exit 0
    fi
}

# ============================================
# MAIN EXECUTION
# ============================================
main() {
    print_header "Security Scan v1.0"
    print_info "Scanning directory: $SCRIPT_DIR"
    echo ""

    count_files
    print_info "Will scan approximately $FILES_SCANNED files"

    scan_api_keys
    check_env_files
    check_git_tracking
    check_gitignore
    scan_for_hardcoded_urls
    print_summary
}

# Run main function
main "$@"
