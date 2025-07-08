# Contributing to Ultimate PowerShell Extension

Thank you for your interest in contributing to the Ultimate PowerShell Extension! This project aims to provide comprehensive Windows system administration tools for Claude Desktop users.

## 🤝 How to Contribute

### Reporting Issues
- **Bug Reports**: Use the GitHub Issues tab to report bugs
- **Feature Requests**: Suggest new tools or improvements
- **Security Issues**: Email security concerns privately

### Development Setup
1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ultimate-powershell-claude-extension.git
   cd ultimate-powershell-claude-extension
   ```
3. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```
4. **Install DXT CLI:**
   ```bash
   npm install -g @anthropic-ai/dxt
   ```

### Making Changes
1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** to `server/index.js`
3. **Test thoroughly** - ensure all existing tools still work
4. **Update documentation** if needed
5. **Build and test the extension:**
   ```bash
   dxt pack
   ```

### Code Guidelines
- **Security First**: All new tools must follow security best practices
- **Path Validation**: Use `isPathAllowed()` for file operations
- **Command Blocking**: Add dangerous commands to `blockedCommands`
- **Error Handling**: Implement comprehensive error handling with helpful messages
- **Logging**: Use the built-in logging system for operations
- **Documentation**: Include clear descriptions and parameter schemas

### Adding New Tools
When adding a new tool, ensure:
1. **Schema Definition**: Complete `inputSchema` with all parameters
2. **Security Validation**: Proper input validation and security checks
3. **Error Handling**: Graceful error handling with suggestions
4. **Timeout Support**: Implement timeout controls for long operations
5. **Logging**: Operation logging for audit trails
6. **Testing**: Thorough testing on Windows 10/11

### Pull Request Process
1. **Update README.md** if adding new features
2. **Update RELEASE_NOTES.md** with your changes
3. **Ensure all tests pass** (manual testing required)
4. **Submit pull request** with clear description
5. **Respond to review feedback** promptly

## 🛡️ Security Guidelines

### Never Add Tools That:
- Execute arbitrary system commands without validation
- Access sensitive system areas (Registry HKLM writes, system directories)
- Bypass Windows security mechanisms
- Could be used for malicious purposes

### Always Implement:
- Input validation and sanitization
- Path restriction to safe directories
- Command blocking for dangerous operations
- Timeout controls for all operations
- Comprehensive error handling

## 📋 Tool Categories

### Current Categories:
- **Core PowerShell**: Command and script execution
- **File Operations**: Safe file system management
- **Registry Access**: Read-only registry access (HKCU writes only)
- **Batch Scripts**: Template-based script creation
- **Module Management**: PowerShell module control
- **System Administration**: Service and event log management
- **Monitoring**: Operation logging and statistics

### Potential New Categories:
- **Network Management**: Network configuration tools
- **Process Management**: Advanced process control
- **Performance Monitoring**: System performance metrics
- **Backup Tools**: Automated backup utilities
- **Security Tools**: Security assessment and hardening

## 🧪 Testing

### Manual Testing Required:
- Test all existing tools after changes
- Verify security restrictions work correctly
- Test error handling scenarios
- Validate on clean Windows 10/11 systems
- Test with different user permission levels

### Test Cases to Cover:
- **Happy Path**: Normal operation with valid inputs
- **Error Cases**: Invalid inputs, missing files, permission errors
- **Security**: Attempted bypass of security restrictions
- **Performance**: Large file operations, long-running commands
- **Edge Cases**: Special characters, long paths, concurrent operations

## 📝 Documentation Standards

### Code Comments:
- Document complex security logic
- Explain PowerShell command construction
- Note Windows-specific behaviors
- Document any workarounds or limitations

### User Documentation:
- Clear tool descriptions
- Example usage scenarios
- Parameter explanations
- Security implications

## 🔄 Release Process

1. **Version Numbering**: Follow semantic versioning (MAJOR.MINOR.PATCH)
2. **Release Notes**: Document all changes, new features, and bug fixes
3. **DXT Packaging**: Build and test .dxt file before release
4. **GitHub Release**: Create proper GitHub release with assets
5. **Community Notification**: Announce significant updates

## 🎯 Project Goals

- **Comprehensive**: Cover all common Windows administration tasks
- **Secure**: Enterprise-grade security by default
- **User-Friendly**: Easy to use through natural language with Claude
- **Reliable**: Robust error handling and logging
- **Professional**: Production-ready code quality

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community support
- **Documentation**: Check README.md and inline code comments

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor insights

Thank you for helping make Windows system administration easier for Claude Desktop users!
