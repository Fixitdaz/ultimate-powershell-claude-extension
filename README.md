# Ultimate PowerShell Extension for Claude Desktop

[![Release](https://img.shields.io/github/v/release/Fixitdaz/ultimate-powershell-claude-extension)](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/releases)
[![Downloads](https://img.shields.io/github/downloads/Fixitdaz/ultimate-powershell-claude-extension/total)](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/releases)
[![License](https://img.shields.io/github/license/Fixitdaz/ultimate-powershell-claude-extension)](LICENSE)
[![Issues](https://img.shields.io/github/issues/Fixitdaz/ultimate-powershell-claude-extension)](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/issues)
[![Stars](https://img.shields.io/github/stars/Fixitdaz/ultimate-powershell-claude-extension)](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/stargazers)

A comprehensive system administration toolkit that extends Claude Desktop with **20 powerful PowerShell tools** for Windows automation and management.

> **🎯 Transform Claude Desktop into your ultimate Windows system administration companion**

## 📖 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Tool Reference](#-tool-reference)
- [Security](#-security)
- [Examples](#-examples)
- [Contributing](#-contributing)
- [Support](#-support)

## 🚀 Features

### 🔧 Core PowerShell Operations
- **execute_powershell** - Execute PowerShell commands with enhanced security
- **run_powershell_script** - Execute .ps1 scripts with parameter support

### 📁 File System Management
- **read_file** - Read text files with encoding detection
- **write_file** - Write content with backup options
- **list_directory** - Advanced directory listing with filtering
- **create_directory** - Create directories recursively
- **copy_file** - Copy files with timestamp preservation
- **move_file** - Move/rename files safely
- **delete_file** - Safe deletion with recycle bin support
- **get_file_info** - Comprehensive file metadata and hash calculation

### 🔑 Windows Registry Access
- **read_registry** - Read registry values from safe locations
- **write_registry** - Write registry values (HKCU only for security)

### 🔄 Batch Script Support
- **execute_batch** - Run .bat/.cmd files with environment control
- **create_batch_script** - Create scripts from templates

### 📦 PowerShell Module Management
- **list_modules** - List available and imported modules
- **import_module** - Import modules with dependency resolution

### ⚙️ System Administration
- **get_system_info** - Hardware, software, and network information
- **manage_services** - Windows service management (start/stop/restart)
- **get_event_logs** - Query Windows event logs with filtering

### 📊 Monitoring & Logging
- **get_server_logs** - MCP server operation logs and statistics

## 🛡️ Security Features

- **🚫 Command Blocking** - Prevents execution of dangerous commands
- **📂 Path Restrictions** - Limits file operations to safe directories
- **🔐 Registry Protection** - Restricts registry access to safe keys
- **📝 Operation Logging** - Comprehensive audit trail
- **⚡ Error Handling** - Detailed error messages with suggestions
- **⏱️ Timeout Controls** - Prevents runaway operations

## 📦 Installation

### Quick Install
1. **Download** the latest `.dxt` file from [Releases](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/releases)
2. **Double-click** the file to open with Claude Desktop
3. **Click "Install"** in the installation dialog
4. **Start using** all 20 tools immediately!

### Manual Install
```bash
# Clone and build from source
git clone https://github.com/Fixitdaz/ultimate-powershell-claude-extension.git
cd ultimate-powershell-claude-extension/server
npm install
cd ..
dxt pack
```

## 🚀 Quick Start

Once installed, you can use natural language with Claude Desktop:

```
"List all files in my Documents folder"
"Execute the PowerShell command Get-Process"
"Create a batch script to backup my files"
"Check Windows event logs for errors"
"Get information about my system hardware"
```

## 🔧 Tool Reference

<details>
<summary><strong>📋 Complete Tool List (Click to expand)</strong></summary>

### Core PowerShell (2 tools)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `execute_powershell` | Execute PowerShell commands | ⚡ Enhanced |
| `run_powershell_script` | Execute .ps1 scripts | ⚡ Enhanced |

### File Operations (8 tools)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `read_file` | Read text files | 🔒 Path restricted |
| `write_file` | Write/append to files | 🔒 Path restricted |
| `list_directory` | List directory contents | 🔒 Path restricted |
| `create_directory` | Create directories | 🔒 Path restricted |
| `copy_file` | Copy files | 🔒 Path restricted |
| `move_file` | Move/rename files | 🔒 Path restricted |
| `delete_file` | Delete files (recycle bin) | 🔒 Path restricted |
| `get_file_info` | File metadata + hash | 🔒 Path restricted |

### Registry Operations (2 tools)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `read_registry` | Read registry values | 🔐 Safe keys only |
| `write_registry` | Write registry values | 🔐 HKCU only |

### Batch Scripts (2 tools)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `execute_batch` | Run batch files | 🔒 Path restricted |
| `create_batch_script` | Create batch scripts | 🔒 Template based |

### Module Management (2 tools)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `list_modules` | List PowerShell modules | ✅ Safe |
| `import_module` | Import modules | ✅ Safe |

### System Administration (3 tools)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `get_system_info` | System information | ✅ Read-only |
| `manage_services` | Service management | ⚡ Controlled |
| `get_event_logs` | Event log queries | ✅ Read-only |

### Monitoring (1 tool)
| Tool | Description | Security Level |
|------|-------------|----------------|
| `get_server_logs` | Extension logs/stats | ✅ Safe |

</details>

## 💡 Examples

<details>
<summary><strong>🎯 Common Use Cases (Click to expand)</strong></summary>

### File Management
```
"Show me all .txt files in my Documents folder"
"Copy all files from Desktop to a backup folder"
"Create a new directory called ProjectBackup"
"Get the SHA256 hash of my important file"
```

### System Administration
```
"List all running services on my computer"
"Stop the Windows Update service temporarily"
"Show me system information including memory and CPU"
"Check for any error events in the last 24 hours"
```

### PowerShell Operations
```
"Run this PowerShell command: Get-Process | Where CPU -gt 10"
"Execute my backup script located at C:\Scripts\backup.ps1"
"Import the Active Directory PowerShell module"
"List all available PowerShell modules on my system"
```

### Registry Operations
```
"Read the Windows product name from the registry"
"Show me all installed programs from the registry"
"Get the current Windows version information"
```

### Batch Scripting
```
"Create a batch script to backup my Documents folder"
"Run my existing batch file with these parameters"
"Generate a service management script template"
```

</details>

## 🔒 Security

This extension implements enterprise-grade security:

- **Safe by Default**: All operations are restricted to safe directories and operations
- **Audit Trail**: Complete logging of all operations with timestamps
- **Command Validation**: Dangerous commands are automatically blocked
- **Path Restrictions**: File operations limited to user directories
- **Registry Protection**: System registry changes are prevented

See [SECURITY.md](SECURITY.md) for our complete security policy.

## 🏗️ Development

### Prerequisites
- Node.js (latest LTS)
- PowerShell 5.1 or PowerShell Core
- DXT CLI: `npm install -g @anthropic-ai/dxt`

### Building
```bash
cd server
npm install
cd ..
dxt pack
```

### Project Structure
```
├── manifest.json          # Extension metadata
├── server/
│   ├── index.js           # Main MCP server (20 tools)
│   ├── package.json       # Dependencies
│   └── node_modules/      # Bundled dependencies
├── releases/              # Built .dxt files
├── .github/               # GitHub templates
├── README.md             # This file
├── CONTRIBUTING.md       # Development guidelines
├── SECURITY.md          # Security policy
├── CHANGELOG.md         # Version history
└── LICENSE              # MIT License
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Code guidelines
- Security requirements
- Pull request process

### Quick Contribute
1. 🍴 Fork the repository
2. 🌟 Create a feature branch
3. ✅ Make your changes
4. 🧪 Test thoroughly
5. 📤 Submit a pull request

## 📊 Statistics

- **🔧 20 Tools** - Comprehensive system administration
- **🛡️ Enterprise Security** - Production-ready safety features
- **🖥️ Windows 10/11** - Full compatibility
- **⚡ High Performance** - Optimized for speed and reliability
- **📈 Community Driven** - Open source development

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **[🚀 Download Latest Release](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/releases/latest)**
- **[📝 Report Issues](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/issues)**
- **[💬 Discussions](https://github.com/Fixitdaz/ultimate-powershell-claude-extension/discussions)**
- **[Claude Desktop](https://claude.ai/download)**
- **[Model Context Protocol](https://modelcontextprotocol.io/)**

## 🙏 Acknowledgments

- **[Anthropic](https://anthropic.com)** - For Claude Desktop and MCP
- **[Microsoft](https://microsoft.com)** - For PowerShell
- **Community Contributors** - For feedback and improvements

---

<div align="center">

**⭐ If this extension helps you, please consider giving it a star! ⭐**

**Built with ❤️ for the Claude Desktop community**

[⬆️ Back to Top](#ultimate-powershell-extension-for-claude-desktop)

</div>
