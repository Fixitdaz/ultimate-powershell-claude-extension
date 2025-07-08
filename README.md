# Ultimate PowerShell Extension for Claude Desktop

A comprehensive system administration toolkit that extends Claude Desktop with 20 powerful PowerShell tools for Windows automation and management.

## 🚀 Features

### Core PowerShell Operations
- **execute_powershell** - Execute PowerShell commands with enhanced security
- **run_powershell_script** - Execute .ps1 scripts with parameter support

### File System Management
- **read_file** - Read text files with encoding detection
- **write_file** - Write content with backup options
- **list_directory** - Advanced directory listing with filtering
- **create_directory** - Create directories recursively
- **copy_file** - Copy files with timestamp preservation
- **move_file** - Move/rename files safely
- **delete_file** - Safe deletion with recycle bin support
- **get_file_info** - Comprehensive file metadata and hash calculation

### Windows Registry Access
- **read_registry** - Read registry values from safe locations
- **write_registry** - Write registry values (HKCU only for security)

### Batch Script Support
- **execute_batch** - Run .bat/.cmd files with environment control
- **create_batch_script** - Create scripts from templates

### PowerShell Module Management
- **list_modules** - List available and imported modules
- **import_module** - Import modules with dependency resolution

### System Administration
- **get_system_info** - Hardware, software, and network information
- **manage_services** - Windows service management (start/stop/restart)
- **get_event_logs** - Query Windows event logs with filtering

### Monitoring & Logging
- **get_server_logs** - MCP server operation logs and statistics

## 🛡️ Security Features

- **Command Blocking** - Prevents execution of dangerous commands
- **Path Restrictions** - Limits file operations to safe directories
- **Registry Protection** - Restricts registry access to safe keys
- **Operation Logging** - Comprehensive audit trail
- **Error Handling** - Detailed error messages with suggestions

## 📦 Installation

1. Download the latest `.dxt` file from releases
2. Double-click the file to open with Claude Desktop
3. Click "Install" in the installation dialog
4. The extension will be available immediately

## 🔧 Usage

Once installed, you can use any of the 20 tools through Claude Desktop:

```
"Can you list the files in my Documents folder?"
"Execute the PowerShell command Get-Process"
"Create a batch script to backup my files"
"Check the Windows event logs for errors"
"Get detailed information about my system hardware"
```

## 🏗️ Development

### Prerequisites
- Node.js (latest LTS)
- PowerShell 5.1 or PowerShell Core
- DXT CLI: `npm install -g @anthropic-ai/dxt`

### Building
```bash
npm install
dxt pack
```

### Project Structure
```
├── manifest.json          # Extension metadata
├── server/
│   ├── index.js           # Main MCP server
│   ├── package.json       # Node.js dependencies
│   └── node_modules/      # Bundled dependencies
└── README.md
```

## 📊 Statistics

- **20 Tools** - Comprehensive system administration
- **Enterprise Security** - Production-ready safety features
- **Cross-Platform** - Works on Windows 10/11
- **High Performance** - Optimized for speed and reliability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Claude Desktop](https://claude.ai/download)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [DXT Documentation](https://github.com/anthropics/dxt)

## ⚠️ Disclaimer

This extension provides powerful system administration capabilities. Always review commands before execution and ensure you understand the implications of system changes.

---

**Built with ❤️ for the Claude Desktop community**
