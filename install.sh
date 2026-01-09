#!/bin/bash
# ================================================================================
# ONE-LINE INSTALLER
# Universal Environment Configuration System
# ================================================================================
# Usage: curl -sSL https://raw.githubusercontent.com/your-repo/main/install.sh | bash
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
print_banner() {
    echo ""
    echo -e "${PURPLE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}                                                                ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${WHITE}${BOLD}Environment Configuration System Installer${NC}                 ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}Universal setup for secure environment management${NC}          ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                                                                ${PURPLE}║${NC}"
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
INSTALL_DIR="${PWD}"
GITHUB_RAW_BASE="https://raw.githubusercontent.com/your-org/your-repo/main"

# Files to install
FILES=(
    ".env.example"
    ".env.local.example"
    "docker-compose.env.example"
    ".gitignore"
    "setup-env.sh"
    "security-scan.sh"
    "ENV_README.md"
)

# ============================================
# INSTALLATION FUNCTIONS
# ============================================

check_existing_files() {
    print_step "Checking for existing files..."

    local existing=()
    for file in "${FILES[@]}"; do
        if [ -f "$INSTALL_DIR/$file" ]; then
            existing+=("$file")
        fi
    done

    if [ ${#existing[@]} -gt 0 ]; then
        print_warning "The following files already exist:"
        for file in "${existing[@]}"; do
            echo "    - $file"
        done
        echo ""
        read -p "Do you want to backup and replace them? [y/N]: " confirm
        if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
            print_info "Installation cancelled. Existing files preserved."
            exit 0
        fi

        # Backup existing files
        BACKUP_DIR="$INSTALL_DIR/.env-config-backup-$(date +%Y%m%d_%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        for file in "${existing[@]}"; do
            cp "$INSTALL_DIR/$file" "$BACKUP_DIR/"
        done
        print_success "Backed up existing files to $BACKUP_DIR"
    fi
}

download_file() {
    local filename="$1"
    local url="$GITHUB_RAW_BASE/$filename"

    if command -v curl &> /dev/null; then
        curl -sSL "$url" -o "$INSTALL_DIR/$filename" 2>/dev/null && return 0
    elif command -v wget &> /dev/null; then
        wget -q "$url" -O "$INSTALL_DIR/$filename" 2>/dev/null && return 0
    fi
    return 1
}

create_files_locally() {
    print_step "Creating configuration files..."

    # Since we're including this in the project, just copy from templates
    # or create minimal versions if files don't exist

    # Check if we're in a project with these files already
    if [ -f "$INSTALL_DIR/.env.example" ]; then
        print_info "Files already exist in this directory"
        return
    fi

    # Create minimal .env.example if not exists
    if [ ! -f "$INSTALL_DIR/.env.example" ]; then
        print_step "Creating .env.example..."
        cat > "$INSTALL_DIR/.env.example" << 'ENVEOF'
# ================================================================================
# ENVIRONMENT CONFIGURATION TEMPLATE
# ================================================================================
# Copy this file to .env and replace placeholder values
# Never commit .env to version control!
# ================================================================================

# Application
NODE_ENV=development
APP_URL=http://localhost:3000
APP_PORT=3000
APP_SECRET_KEY=generate-with-openssl-rand-hex-32

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp

# Authentication
JWT_SECRET=your-jwt-secret-min-32-chars
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# API Keys (add your services here)
# OPENAI_API_KEY=sk-your-key-here
# STRIPE_SECRET_KEY=sk_test_your-key-here

# ================================================================================
ENVEOF
        print_success "Created .env.example"
    fi

    # Create minimal .gitignore additions
    if [ -f "$INSTALL_DIR/.gitignore" ]; then
        # Check if env entries exist
        if ! grep -q "^\.env$" "$INSTALL_DIR/.gitignore" 2>/dev/null; then
            print_step "Adding env entries to .gitignore..."
            cat >> "$INSTALL_DIR/.gitignore" << 'GITEOF'

# Environment files
.env
.env.*
!.env.example
!.env.*.example

# Private keys
*.pem
*.key
*serviceaccount*.json
GITEOF
            print_success "Updated .gitignore"
        fi
    else
        print_step "Creating .gitignore..."
        cat > "$INSTALL_DIR/.gitignore" << 'GITEOF'
# Environment files
.env
.env.*
!.env.example
!.env.*.example

# Private keys & certificates
*.pem
*.key
*.cert
*serviceaccount*.json

# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
GITEOF
        print_success "Created .gitignore"
    fi
}

make_scripts_executable() {
    print_step "Setting script permissions..."

    for script in setup-env.sh security-scan.sh install.sh; do
        if [ -f "$INSTALL_DIR/$script" ]; then
            chmod +x "$INSTALL_DIR/$script"
            print_success "Made $script executable"
        fi
    done
}

run_setup() {
    if [ -f "$INSTALL_DIR/setup-env.sh" ]; then
        echo ""
        read -p "Run setup-env.sh now to initialize .env? [Y/n]: " run_setup
        if [[ ! "$run_setup" =~ ^[Nn]$ ]]; then
            echo ""
            bash "$INSTALL_DIR/setup-env.sh"
        fi
    fi
}

print_summary() {
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║${NC}  ${WHITE}${BOLD}Installation Complete!${NC}                                       ${GREEN}║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${WHITE}Files created:${NC}"
    for file in "${FILES[@]}"; do
        if [ -f "$INSTALL_DIR/$file" ]; then
            echo -e "  ${CYAN}✓${NC} $file"
        fi
    done
    echo ""
    echo -e "${WHITE}Next steps:${NC}"
    echo "  1. Run ./setup-env.sh to create your .env file"
    echo "  2. Edit .env and add your real credentials"
    echo "  3. Run ./security-scan.sh to verify security"
    echo "  4. Read ENV_README.md for complete documentation"
    echo ""
    echo -e "${YELLOW}Security reminders:${NC}"
    echo "  • Never commit .env files to git"
    echo "  • Use different credentials for dev and production"
    echo "  • Rotate secrets regularly"
    echo ""
}

# ============================================
# MAIN EXECUTION
# ============================================
main() {
    print_banner

    print_info "Installing to: $INSTALL_DIR"
    echo ""

    # Check for existing files
    check_existing_files

    # Try to download from GitHub, fall back to local creation
    print_step "Setting up configuration files..."

    local downloaded=false
    for file in "${FILES[@]}"; do
        if download_file "$file"; then
            print_success "Downloaded $file"
            downloaded=true
        fi
    done

    if [ "$downloaded" = false ]; then
        print_info "Creating files locally..."
        create_files_locally
    fi

    # Make scripts executable
    make_scripts_executable

    # Print summary
    print_summary

    # Optionally run setup
    run_setup
}

# Run main function
main "$@"
