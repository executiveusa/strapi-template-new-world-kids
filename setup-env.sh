#!/bin/bash
# ================================================================================
# ENVIRONMENT SETUP SCRIPT
# Universal configuration initialization and management
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
# HELPER FUNCTIONS
# ============================================
print_header() {
    echo ""
    echo -e "${PURPLE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}  ${WHITE}${BOLD}$1${NC}"
    echo -e "${PURPLE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_step() {
    echo -e "${CYAN}→${NC} $1"
}

# ============================================
# CONFIGURATION
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_EXAMPLE="$SCRIPT_DIR/.env.example"
ENV_FILE="$SCRIPT_DIR/.env"
ENV_LOCAL="$SCRIPT_DIR/.env.local"
ENV_LOCAL_EXAMPLE="$SCRIPT_DIR/.env.local.example"
GITIGNORE="$SCRIPT_DIR/.gitignore"
BACKUP_DIR="$SCRIPT_DIR/.env-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# ============================================
# MAIN FUNCTIONS
# ============================================

check_prerequisites() {
    print_header "Checking Prerequisites"

    # Check if .env.example exists
    if [ ! -f "$ENV_EXAMPLE" ]; then
        print_error ".env.example not found!"
        print_info "Please create .env.example first or run the installer."
        exit 1
    fi
    print_success ".env.example found"

    # Check if git is available
    if command -v git &> /dev/null; then
        print_success "Git is installed"
    else
        print_warning "Git not found - some features disabled"
    fi
}

validate_gitignore() {
    print_header "Validating .gitignore"

    if [ ! -f "$GITIGNORE" ]; then
        print_warning ".gitignore not found - creating one"
        echo ".env" >> "$GITIGNORE"
        echo ".env.*" >> "$GITIGNORE"
        echo "!.env.example" >> "$GITIGNORE"
        echo "!.env.*.example" >> "$GITIGNORE"
        print_success "Created .gitignore with env protection"
        return
    fi

    # Check if .env is in .gitignore
    if grep -q "^\.env$" "$GITIGNORE" || grep -q "^\.env\.\*$" "$GITIGNORE"; then
        print_success ".env files are properly ignored in .gitignore"
    else
        print_warning ".env may not be in .gitignore - adding it now"
        echo "" >> "$GITIGNORE"
        echo "# Environment files (auto-added by setup-env.sh)" >> "$GITIGNORE"
        echo ".env" >> "$GITIGNORE"
        echo ".env.*" >> "$GITIGNORE"
        echo "!.env.example" >> "$GITIGNORE"
        echo "!.env.*.example" >> "$GITIGNORE"
        print_success "Added .env to .gitignore"
    fi

    # Check if .env is tracked in git
    if command -v git &> /dev/null && [ -d "$SCRIPT_DIR/.git" ]; then
        if git ls-files --error-unmatch "$ENV_FILE" &> /dev/null 2>&1; then
            print_error "CRITICAL: .env is tracked in git!"
            print_info "Run: git rm --cached .env"
            print_info "Then commit the change to remove it from tracking"
        else
            print_success ".env is not tracked in git"
        fi
    fi
}

backup_existing_env() {
    print_header "Backup Existing Configuration"

    if [ -f "$ENV_FILE" ]; then
        # Create backup directory if it doesn't exist
        mkdir -p "$BACKUP_DIR"

        BACKUP_FILE="$BACKUP_DIR/.env.backup.$TIMESTAMP"
        cp "$ENV_FILE" "$BACKUP_FILE"
        print_success "Backed up existing .env to $BACKUP_FILE"

        # Also backup .env.local if exists
        if [ -f "$ENV_LOCAL" ]; then
            cp "$ENV_LOCAL" "$BACKUP_DIR/.env.local.backup.$TIMESTAMP"
            print_success "Backed up existing .env.local"
        fi

        # Clean old backups (keep last 10)
        cd "$BACKUP_DIR"
        ls -t .env.backup.* 2>/dev/null | tail -n +11 | xargs -r rm -f
        print_info "Cleanup: keeping last 10 backups"
        cd "$SCRIPT_DIR"
    else
        print_info "No existing .env file to backup"
    fi
}

create_env_file() {
    print_header "Creating Environment File"

    if [ -f "$ENV_FILE" ]; then
        echo ""
        print_warning "An .env file already exists!"
        echo ""
        echo -e "${CYAN}Choose an option:${NC}"
        echo "  1) Keep existing (skip)"
        echo "  2) Replace with fresh copy from .env.example"
        echo "  3) Merge (add missing variables only)"
        echo ""
        read -p "Enter choice [1-3]: " choice

        case $choice in
            1)
                print_info "Keeping existing .env file"
                return
                ;;
            2)
                cp "$ENV_EXAMPLE" "$ENV_FILE"
                print_success "Replaced .env with fresh copy"
                ;;
            3)
                merge_env_files
                ;;
            *)
                print_warning "Invalid choice, keeping existing file"
                return
                ;;
        esac
    else
        cp "$ENV_EXAMPLE" "$ENV_FILE"
        print_success "Created .env from .env.example"
    fi
}

merge_env_files() {
    print_step "Merging environment files..."

    TEMP_FILE=$(mktemp)

    # Copy existing env file
    cat "$ENV_FILE" > "$TEMP_FILE"

    # Add a separator
    echo "" >> "$TEMP_FILE"
    echo "# ============================================" >> "$TEMP_FILE"
    echo "# NEW VARIABLES (added by setup-env.sh on $TIMESTAMP)" >> "$TEMP_FILE"
    echo "# ============================================" >> "$TEMP_FILE"

    # Find variables in example that aren't in current env
    ADDED=0
    while IFS= read -r line; do
        # Skip comments and empty lines
        [[ "$line" =~ ^#.*$ ]] && continue
        [[ -z "$line" ]] && continue

        # Extract variable name
        VAR_NAME=$(echo "$line" | cut -d'=' -f1)

        # Check if variable exists in current .env
        if ! grep -q "^${VAR_NAME}=" "$ENV_FILE"; then
            echo "$line" >> "$TEMP_FILE"
            ((ADDED++))
        fi
    done < "$ENV_EXAMPLE"

    mv "$TEMP_FILE" "$ENV_FILE"
    print_success "Merged files - added $ADDED new variables"
}

create_env_local() {
    print_header "Creating Local Development Overrides"

    if [ -f "$ENV_LOCAL_EXAMPLE" ]; then
        if [ -f "$ENV_LOCAL" ]; then
            print_info ".env.local already exists - skipping"
        else
            cp "$ENV_LOCAL_EXAMPLE" "$ENV_LOCAL"
            print_success "Created .env.local from template"
        fi
    else
        print_info "No .env.local.example found - skipping"
    fi
}

set_secure_permissions() {
    print_header "Setting Secure Permissions"

    if [ -f "$ENV_FILE" ]; then
        chmod 600 "$ENV_FILE"
        print_success "Set .env permissions to 600 (owner read/write only)"
    fi

    if [ -f "$ENV_LOCAL" ]; then
        chmod 600 "$ENV_LOCAL"
        print_success "Set .env.local permissions to 600"
    fi

    # Secure backup directory
    if [ -d "$BACKUP_DIR" ]; then
        chmod 700 "$BACKUP_DIR"
        print_success "Set backup directory permissions to 700"
    fi
}

generate_secrets() {
    print_header "Generate Secure Secrets"

    echo -e "${CYAN}Would you like to generate secure random values for secrets?${NC}"
    read -p "Generate secrets? [y/N]: " generate

    if [[ "$generate" =~ ^[Yy]$ ]]; then
        echo ""
        print_info "You can use these commands to generate secure secrets:"
        echo ""
        echo -e "${WHITE}# 32-character hex string (for API keys):${NC}"
        echo -e "${GREEN}openssl rand -hex 32${NC}"
        echo ""
        echo -e "${WHITE}# 64-character base64 string (for JWT secrets):${NC}"
        echo -e "${GREEN}openssl rand -base64 48${NC}"
        echo ""
        echo -e "${WHITE}# UUID (for unique identifiers):${NC}"
        echo -e "${GREEN}uuidgen || cat /proc/sys/kernel/random/uuid${NC}"
        echo ""

        if command -v openssl &> /dev/null; then
            echo -e "${CYAN}Here are some freshly generated secrets:${NC}"
            echo ""
            echo -e "APP_SECRET_KEY=${GREEN}$(openssl rand -hex 32)${NC}"
            echo -e "JWT_SECRET=${GREEN}$(openssl rand -base64 48 | tr -d '\n')${NC}"
            echo -e "NEXTAUTH_SECRET=${GREEN}$(openssl rand -base64 32 | tr -d '\n')${NC}"
            echo -e "SESSION_SECRET=${GREEN}$(openssl rand -hex 32)${NC}"
            echo ""
            print_info "Copy these to your .env file and replace the placeholders"
        fi
    fi
}

run_security_scan() {
    print_header "Security Check"

    if [ -f "$SCRIPT_DIR/security-scan.sh" ]; then
        print_step "Running security scan..."
        bash "$SCRIPT_DIR/security-scan.sh" || true
    else
        print_warning "security-scan.sh not found - skipping security scan"
    fi
}

print_summary() {
    print_header "Setup Complete!"

    echo -e "${GREEN}Environment configuration is ready.${NC}"
    echo ""
    echo -e "${WHITE}Created/Updated files:${NC}"
    [ -f "$ENV_FILE" ] && echo -e "  ${CYAN}✓${NC} .env"
    [ -f "$ENV_LOCAL" ] && echo -e "  ${CYAN}✓${NC} .env.local"
    [ -d "$BACKUP_DIR" ] && echo -e "  ${CYAN}✓${NC} .env-backups/ (backup directory)"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Edit .env and replace placeholder values with real credentials"
    echo "  2. Run ./security-scan.sh to verify no secrets are exposed"
    echo "  3. Never commit .env files to version control"
    echo ""
    echo -e "${RED}SECURITY REMINDER:${NC}"
    echo "  • Keep .env files secure and never share them"
    echo "  • Rotate any credentials that may have been exposed"
    echo "  • Use different credentials for development and production"
    echo ""
}

# ============================================
# COMMAND LINE OPTIONS
# ============================================
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Environment setup and configuration management script"
    echo ""
    echo "Options:"
    echo "  -h, --help      Show this help message"
    echo "  -b, --backup    Backup existing .env files only"
    echo "  -m, --merge     Merge new variables into existing .env"
    echo "  -r, --replace   Replace .env with fresh copy (after backup)"
    echo "  -s, --scan      Run security scan only"
    echo "  -g, --generate  Generate secure secrets only"
    echo ""
    echo "Examples:"
    echo "  $0              Run full setup interactively"
    echo "  $0 --backup     Backup existing configuration"
    echo "  $0 --scan       Check for exposed secrets"
    echo ""
}

# ============================================
# MAIN EXECUTION
# ============================================
main() {
    print_header "Environment Setup Script v1.0"

    case "${1:-}" in
        -h|--help)
            show_help
            exit 0
            ;;
        -b|--backup)
            check_prerequisites
            backup_existing_env
            ;;
        -m|--merge)
            check_prerequisites
            backup_existing_env
            merge_env_files
            set_secure_permissions
            ;;
        -r|--replace)
            check_prerequisites
            backup_existing_env
            cp "$ENV_EXAMPLE" "$ENV_FILE"
            print_success "Replaced .env with fresh copy"
            set_secure_permissions
            ;;
        -s|--scan)
            run_security_scan
            ;;
        -g|--generate)
            generate_secrets
            ;;
        *)
            # Full setup
            check_prerequisites
            validate_gitignore
            backup_existing_env
            create_env_file
            create_env_local
            set_secure_permissions
            generate_secrets
            run_security_scan
            print_summary
            ;;
    esac
}

# Run main function with all arguments
main "$@"
