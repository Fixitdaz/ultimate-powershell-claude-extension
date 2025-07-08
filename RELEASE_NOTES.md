# Release Notes - Ultimate PowerShell Extension v3.0.0

## 🎉 Initial Release - Complete System Administration Toolkit

The Ultimate PowerShell Extension for Claude Desktop provides 20 powerful tools for Windows system administration and automation.

### 🚀 Features Included

#### Core PowerShell Operations (2 tools)
- **execute_powershell** - Execute PowerShell commands with enhanced security and logging
- **run_powershell_script** - Execute .ps1 scripts with parameter support and module loading

#### File System Management (8 tools)
- **read_file** - Read text files with encoding detection and size limits
- **write_file** - Write content with backup options and append support
- **list_directory** - Advanced directory listing with filtering and sorting
- **create_directory** - Create directories with recursive support
- **copy_file** - Copy files with timestamp preservation
- **move_file** - Move/rename files safely with overwrite protection
- **delete_file** - Safe deletion with recycle bin support
- **get_file_info** - Comprehensive file metadata and SHA256 hash calculation

#### Windows Registry Access (2 tools)
- **read_registry** - Read registry values from safe, allowed locations
- **write_registry** - Write registry values (HKCU only for security)

#### Batch Script Support (2 tools)
- **execute_batch** - Run .bat/.cmd files with environment control and working directory
- **create_batch_script** - Create scripts from built-in templates (basic, service, backup)

#### PowerShell Module Management (2 tools)
- **list_modules** - List available, imported, or all PowerShell modules
- **import_module** - Import modules with force and global options

#### System Administration (3 tools)
- **get_system_info** - Hardware, software, and network information with detailed options
- **manage_services** - Windows service management (list, start, stop, restart, status)
- **get_event_logs** - Query Windows event logs with filtering by level and time

#### Monitoring & Logging (1 tool)
- **get_server_logs** - MCP server operation logs and comprehensive statistics

### 🛡️ Security Features

- **Command Blocking** - Prevents execution of dangerous system commands
- **Path Restrictions** - Limits file operations to safe user directories
- **Registry Protection** - Restricts registry access to safe, read-only keys
- **Operation Logging** - Comprehensive audit trail with timestamps
- **Error Handling** - Detailed error messages with helpful suggestions
- **Timeout Controls** - Prevents runaway operations

### 📊 Technical Specifications

- **Total Tools:** 20
- **Package Size:** 2.2MB
- **Unpacked Size:** 7.5MB
- **Security Level:** Enterprise-grade
- **Platform:** Windows 10/11
- **Dependencies:** Node.js (bundled), PowerShell 5.1+

### 💾 Installation

1. Download `ultimate-powershell-claude-extension-v3.0.0.dxt`
2. Double-click the file to open with Claude Desktop
3. Click "Install" in the installation dialog
4. All 20 tools will be immediately available

### 🔧 Usage Examples

```
"List all files in my Documents folder sorted by size"
"Execute the PowerShell command Get-Process | Where-Object CPU -gt 10"
"Create a backup batch script for my important files"
"Check Windows event logs for errors in the last 24 hours"
"Get detailed information about my system hardware"
"Read the registry value for Windows product name"
"Import the Active Directory PowerShell module"
```

### 🏗️ Development

Built using:
- Model Context Protocol (MCP) SDK
- Desktop Extensions (DXT) packaging format
- Node.js runtime environment
- Enterprise security best practices

### ⚠️ System Requirements

- **OS:** Windows 10 (1909+) or Windows 11
- **App:** Claude Desktop (latest version)
- **PowerShell:** 5.1 or PowerShell Core 6.0+
- **Permissions:** Standard user (admin not required for most operations)

### 🤝 Contributing

This is an open-source project. Contributions, bug reports, and feature requests are welcome!

- **Repository:** https://github.com/Fixitdaz/ultimate-powershell-claude-extension
- **Issues:** Report bugs or request features
- **Pull Requests:** Submit improvements

### 📄 License

MIT License - Free for personal and commercial use

---

**🎯 This release provides everything needed for comprehensive Windows system administration through Claude Desktop.**
