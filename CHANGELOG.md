# Changelog

All notable changes to the Ultimate PowerShell Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2025-01-08

### Added
- **Initial Release** - Complete system administration toolkit for Claude Desktop
- **Core PowerShell Operations** (2 tools):
  - `execute_powershell` - Execute PowerShell commands with enhanced security
  - `run_powershell_script` - Execute .ps1 scripts with module support
- **File System Management** (8 tools):
  - `read_file` - Read text files with encoding detection
  - `write_file` - Write files with backup options
  - `list_directory` - Advanced directory listing with filtering
  - `create_directory` - Create directories recursively
  - `copy_file` - Copy files with timestamp preservation
  - `move_file` - Move/rename files safely
  - `delete_file` - Safe deletion with recycle bin support
  - `get_file_info` - File metadata and hash calculation
- **Windows Registry Access** (2 tools):
  - `read_registry` - Read registry values from safe locations
  - `write_registry` - Write registry values (HKCU only)
- **Batch Script Support** (2 tools):
  - `execute_batch` - Run .bat/.cmd files with environment control
  - `create_batch_script` - Create scripts from templates
- **PowerShell Module Management** (2 tools):
  - `list_modules` - List available and imported modules
  - `import_module` - Import modules with dependency resolution
- **System Administration** (3 tools):
  - `get_system_info` - Hardware, software, and network information
  - `manage_services` - Windows service management
  - `get_event_logs` - Query Windows event logs with filtering
- **Monitoring & Logging** (1 tool):
  - `get_server_logs` - MCP server logs and statistics

### Security
- **Command Blocking** - Prevents execution of dangerous system commands
- **Path Restrictions** - Limits file operations to safe user directories
- **Registry Protection** - Restricts registry access to safe keys
- **Operation Logging** - Comprehensive audit trail with timestamps
- **Error Handling** - Detailed error messages with security suggestions
- **Timeout Controls** - Prevents runaway operations

### Documentation
- Complete README with installation and usage instructions
- Professional release notes
- MIT License for open source distribution
- Contributing guidelines for community development
- Security policy for responsible disclosure
- Issue templates for bug reports and feature requests

### Infrastructure
- GitHub repository with proper tagging and releases
- Professional DXT packaging for one-click installation
- Comprehensive logging system with performance statistics
- Cross-platform compatibility (Windows 10/11)

---

## Version History

### [3.0.0] - 2025-01-08
- Initial public release with 20 comprehensive tools
- Enterprise-grade security implementation
- Professional documentation and community guidelines
- Full GitHub integration with releases and issue tracking

---

## Future Roadmap

### Planned Features
- **Network Management Tools** - Network configuration and monitoring
- **Process Management** - Advanced process control and monitoring
- **Performance Monitoring** - System performance metrics and analysis
- **Backup Utilities** - Automated backup and restore tools
- **Security Tools** - Security assessment and hardening utilities

### Security Enhancements
- Role-based access controls
- Enhanced audit logging
- Integration with Windows Event Tracing
- Certificate-based validation

### Platform Support
- PowerShell Core compatibility improvements
- Enhanced Windows 11 specific features
- ARM64 Windows support validation

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Security

See [SECURITY.md](SECURITY.md) for our security policy and vulnerability reporting process.
