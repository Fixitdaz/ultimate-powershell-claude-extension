# Security Policy

## 🛡️ Security Commitment

The Ultimate PowerShell Extension takes security seriously. This extension provides powerful system administration capabilities, and we implement multiple layers of security to protect users.

## 🔒 Built-in Security Features

### Command Blocking
The extension automatically blocks dangerous commands including:
- System destructive operations (`format`, `diskpart`, `shutdown`)
- User account manipulation (`net user`, `takeown`)
- Registry modifications in sensitive areas
- Process termination of critical system processes
- Network configuration changes that could compromise security

### Path Restrictions
File operations are restricted to safe directories:
- User's home directory (`%USERPROFILE%`)
- Documents, Desktop, Downloads folders
- Current working directory
- Temporary directories (`C:\Temp`, `C:\Windows\Temp`)

### Registry Protection
Registry access is limited to:
- **Read Access**: Safe registry keys (installed programs, Windows version info)
- **Write Access**: HKEY_CURRENT_USER only (no system-wide changes)
- **Blocked**: HKEY_LOCAL_MACHINE writes, system service modifications

### Operation Logging
All operations are logged with:
- Timestamps
- Command details
- Success/failure status
- Error messages
- User context

## 🚨 Reporting Security Vulnerabilities

We take security vulnerabilities seriously. If you discover a security issue:

### For Critical Security Issues:
**Do NOT open a public GitHub issue**

Instead:
1. **Email**: Send details privately to the repository owner
2. **Include**: Detailed description, steps to reproduce, potential impact
3. **Response**: We will respond within 48 hours
4. **Disclosure**: Coordinated disclosure after fix is available

### For Non-Critical Security Concerns:
1. Open a GitHub issue with the "security" label
2. Provide detailed description
3. Include potential security implications

## ✅ Security Best Practices for Users

### Installation Security
- Only install from official sources (GitHub releases)
- Verify file integrity if possible
- Review permissions requested during installation

### Usage Security
- Understand the implications of commands before execution
- Don't bypass security restrictions
- Regularly review operation logs
- Keep Claude Desktop updated

### Administrative Usage
- Run with least privilege necessary
- Monitor extension logs for suspicious activity
- Implement organizational policies if needed
- Regular security reviews of allowed operations

## 🔧 Security Configuration

### Enterprise Deployment
Organizations can:
- Review and approve allowed operations
- Implement additional path restrictions
- Monitor operation logs centrally
- Disable specific tools if needed

### User Controls
Users can:
- Review operation logs via `get_server_logs`
- Monitor file system changes
- Track PowerShell module usage
- Audit registry access attempts

## 📋 Security Scope

### What We Protect Against:
- ✅ Accidental system damage
- ✅ Unauthorized file access outside allowed paths
- ✅ Malicious registry modifications
- ✅ Command injection attacks
- ✅ Privilege escalation attempts
- ✅ Unintended system configuration changes

### What Users Must Protect Against:
- ⚠️ Social engineering attacks
- ⚠️ Malicious PowerShell scripts from untrusted sources
- ⚠️ Physical access security
- ⚠️ Network security
- ⚠️ Overall system security hygiene

## 🔄 Security Updates

### Update Process:
1. Security issues are prioritized for immediate fixes
2. Emergency releases may be created for critical vulnerabilities
3. Users are notified through GitHub releases
4. Security fixes are documented in release notes

### Staying Informed:
- Watch the GitHub repository for security updates
- Subscribe to release notifications
- Review CHANGELOG for security-related changes

## 📞 Contact Information

For security-related questions or concerns:
- **General Questions**: GitHub Issues
- **Security Vulnerabilities**: Private communication via repository owner contact
- **Community Discussion**: GitHub Discussions

## 🏆 Security Contributors

We appreciate security researchers and contributors who help improve the extension's security posture. Security contributors will be recognized (with their permission) in:
- Release notes for security fixes
- Security section of README
- Special thanks in documentation

## ⚖️ Responsible Disclosure

We follow responsible disclosure principles:
- Security researchers are given reasonable time to report issues
- We work with researchers to understand and fix vulnerabilities
- Public disclosure occurs after fixes are available
- Credit is given to security researchers (unless they prefer anonymity)

---

**Last Updated**: January 2025
**Policy Version**: 1.0

This security policy may be updated as the project evolves. Users will be notified of significant changes through GitHub notifications.
