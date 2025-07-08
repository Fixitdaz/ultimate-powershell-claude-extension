#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class UltimatePowerShellMCPServer {
  constructor() {
    this.server = new Server(
      { name: 'ultimate-powershell-executor', version: '3.0.0' },
      { capabilities: { tools: {} } }
    );

    this.logs = [];
    this.maxLogs = 1000;
    this.startTime = new Date();
    this.operationCount = 0;
    this.errorCount = 0;

    this.blockedCommands = [
      'rm', 'del', 'remove-item', 'rmdir', 'format', 'shutdown', 'restart',
      'reg delete', 'regedit', 'net user', 'netsh', 'takeown', 'icacls',
      'diskpart', 'bcdedit', 'schtasks /delete', 'wmic process call terminate'
    ];
    
    this.allowedPaths = [
      process.env.USERPROFILE,
      process.cwd(),
      path.join(process.env.USERPROFILE, 'Documents'),
      path.join(process.env.USERPROFILE, 'Desktop'),
      path.join(process.env.USERPROFILE, 'Downloads'),
      'C:\\Temp'
    ];

    this.allowedRegistryKeys = [
      'HKCU:',
      'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall',
      'HKLM:\\SYSTEM\\CurrentControlSet\\Services'
    ];

    this.setupToolHandlers();
    this.setupErrorHandling();
    this.log('info', 'Ultimate PowerShell MCP Server v3.0 initialized');
  }

  log(level, message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      data,
      operation: this.operationCount
    };
    
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) this.logs.shift();
    console.error(`[${logEntry.timestamp}] ${logEntry.level}: ${message}`);
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      this.log('error', 'MCP Server Error', error.message);
      this.errorCount++;
    };

    process.on('SIGINT', async () => {
      this.log('info', 'Server shutdown requested');
      await this.server.close();
      process.exit(0);
    });
  }

  isPathAllowed(filePath) {
    const absolutePath = path.resolve(filePath);
    return this.allowedPaths.some(allowedPath => 
      absolutePath.startsWith(path.resolve(allowedPath))
    );
  }

  isRegistryKeyAllowed(keyPath) {
    return this.allowedRegistryKeys.some(allowedKey => 
      keyPath.toUpperCase().startsWith(allowedKey.toUpperCase())
    );
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'execute_powershell',
          description: 'Execute PowerShell commands with enhanced security and logging',
          inputSchema: {
            type: 'object',
            properties: {
              command: { type: 'string', description: 'PowerShell command to execute' },
              timeout: { type: 'number', description: 'Timeout in seconds', default: 30 },
              loadModules: { type: 'array', items: { type: 'string' }, description: 'Modules to import', default: [] },
            },
            required: ['command'],
          },
        },
        {
          name: 'run_powershell_script',
          description: 'Execute PowerShell scripts from file paths',
          inputSchema: {
            type: 'object',
            properties: {
              scriptPath: { type: 'string', description: 'Path to PowerShell script' },
              parameters: { type: 'array', items: { type: 'string' }, description: 'Script parameters', default: [] },
              timeout: { type: 'number', description: 'Timeout in seconds', default: 30 },
            },
            required: ['scriptPath'],
          },
        },
        {
          name: 'read_file',
          description: 'Read text files with encoding detection',
          inputSchema: {
            type: 'object',
            properties: {
              filePath: { type: 'string', description: 'File path to read' },
              encoding: { type: 'string', description: 'File encoding', default: 'utf8' },
              maxSize: { type: 'number', description: 'Max file size in bytes', default: 1048576 },
            },
            required: ['filePath'],
          },
        },
        {
          name: 'write_file',
          description: 'Write content to files with backup options',
          inputSchema: {
            type: 'object',
            properties: {
              filePath: { type: 'string', description: 'File path to write' },
              content: { type: 'string', description: 'Content to write' },
              encoding: { type: 'string', description: 'File encoding', default: 'utf8' },
              append: { type: 'boolean', description: 'Append to file', default: false },
              backup: { type: 'boolean', description: 'Create backup', default: false },
            },
            required: ['filePath', 'content'],
          },
        },
        {
          name: 'list_directory',
          description: 'Advanced directory listing with filtering',
          inputSchema: {
            type: 'object',
            properties: {
              dirPath: { type: 'string', description: 'Directory path' },
              includeHidden: { type: 'boolean', description: 'Include hidden files', default: false },
              recursive: { type: 'boolean', description: 'List recursively', default: false },
              filter: { type: 'string', description: 'File filter', default: '*' },
              sortBy: { type: 'string', description: 'Sort by: name, size, date', default: 'name' },
            },
            required: ['dirPath'],
          },
        },
        {
          name: 'create_directory',
          description: 'Create directories',
          inputSchema: {
            type: 'object',
            properties: {
              dirPath: { type: 'string', description: 'Directory path' },
              recursive: { type: 'boolean', description: 'Create parent dirs', default: true },
            },
            required: ['dirPath'],
          },
        },
        {
          name: 'copy_file',
          description: 'Copy files with options',
          inputSchema: {
            type: 'object',
            properties: {
              sourcePath: { type: 'string', description: 'Source file path' },
              destinationPath: { type: 'string', description: 'Destination path' },
              overwrite: { type: 'boolean', description: 'Overwrite if exists', default: false },
            },
            required: ['sourcePath', 'destinationPath'],
          },
        },
        {
          name: 'move_file',
          description: 'Move or rename files',
          inputSchema: {
            type: 'object',
            properties: {
              sourcePath: { type: 'string', description: 'Source file path' },
              destinationPath: { type: 'string', description: 'Destination path' },
              overwrite: { type: 'boolean', description: 'Overwrite if exists', default: false },
            },
            required: ['sourcePath', 'destinationPath'],
          },
        },
        {
          name: 'delete_file',
          description: 'Safely delete files with recycle bin option',
          inputSchema: {
            type: 'object',
            properties: {
              filePath: { type: 'string', description: 'File path to delete' },
              recursive: { type: 'boolean', description: 'Delete recursively', default: false },
              useRecycleBin: { type: 'boolean', description: 'Use recycle bin', default: true },
            },
            required: ['filePath'],
          },
        },
        {
          name: 'get_file_info',
          description: 'Get comprehensive file information',
          inputSchema: {
            type: 'object',
            properties: {
              filePath: { type: 'string', description: 'File path' },
              includeHash: { type: 'boolean', description: 'Calculate file hash', default: false },
            },
            required: ['filePath'],
          },
        },
        {
          name: 'read_registry',
          description: 'Read Windows registry values safely',
          inputSchema: {
            type: 'object',
            properties: {
              keyPath: { type: 'string', description: 'Registry key path' },
              valueName: { type: 'string', description: 'Value name', default: '' },
              recurse: { type: 'boolean', description: 'Recurse subkeys', default: false },
            },
            required: ['keyPath'],
          },
        },
        {
          name: 'write_registry',
          description: 'Write Windows registry values (HKCU only)',
          inputSchema: {
            type: 'object',
            properties: {
              keyPath: { type: 'string', description: 'Registry key path' },
              valueName: { type: 'string', description: 'Value name' },
              value: { type: 'string', description: 'Value to write' },
              valueType: { type: 'string', description: 'Value type', default: 'String' },
            },
            required: ['keyPath', 'valueName', 'value'],
          },
        },
        {
          name: 'execute_batch',
          description: 'Execute batch (.bat/.cmd) files',
          inputSchema: {
            type: 'object',
            properties: {
              scriptPath: { type: 'string', description: 'Batch script path' },
              parameters: { type: 'array', items: { type: 'string' }, description: 'Parameters', default: [] },
              timeout: { type: 'number', description: 'Timeout in seconds', default: 30 },
              environmentVars: { type: 'object', description: 'Environment variables', default: {} },
            },
            required: ['scriptPath'],
          },
        },
        {
          name: 'create_batch_script',
          description: 'Create batch scripts with templates',
          inputSchema: {
            type: 'object',
            properties: {
              scriptPath: { type: 'string', description: 'Script save path' },
              content: { type: 'string', description: 'Script content' },
              template: { type: 'string', description: 'Template: basic, service, backup', default: '' },
              variables: { type: 'object', description: 'Template variables', default: {} },
            },
            required: ['scriptPath', 'content'],
          },
        },
        {
          name: 'list_modules',
          description: 'List PowerShell modules',
          inputSchema: {
            type: 'object',
            properties: {
              listType: { type: 'string', description: 'Type: available, imported, all', default: 'imported' },
              filter: { type: 'string', description: 'Name filter', default: '*' },
            },
          },
        },
        {
          name: 'import_module',
          description: 'Import PowerShell modules',
          inputSchema: {
            type: 'object',
            properties: {
              moduleName: { type: 'string', description: 'Module name' },
              force: { type: 'boolean', description: 'Force reimport', default: false },
            },
            required: ['moduleName'],
          },
        },
        {
          name: 'get_system_info',
          description: 'Get comprehensive system information',
          inputSchema: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Category: all, hardware, software, network', default: 'all' },
              detailed: { type: 'boolean', description: 'Include detailed info', default: false },
            },
          },
        },
        {
          name: 'manage_services',
          description: 'Manage Windows services',
          inputSchema: {
            type: 'object',
            properties: {
              action: { type: 'string', description: 'Action: list, start, stop, restart, status' },
              serviceName: { type: 'string', description: 'Service name', default: '' },
              filter: { type: 'string', description: 'Service filter', default: '*' },
            },
            required: ['action'],
          },
        },
        {
          name: 'get_event_logs',
          description: 'Query Windows event logs',
          inputSchema: {
            type: 'object',
            properties: {
              logName: { type: 'string', description: 'Log name', default: 'System' },
              maxEvents: { type: 'number', description: 'Max events', default: 50 },
              level: { type: 'string', description: 'Event level', default: '' },
              hours: { type: 'number', description: 'Hours back', default: 24 },
            },
          },
        },
        {
          name: 'get_server_logs',
          description: 'Get MCP server logs and statistics',
          inputSchema: {
            type: 'object',
            properties: {
              level: { type: 'string', description: 'Log level filter', default: 'all' },
              maxEntries: { type: 'number', description: 'Max entries', default: 100 },
              includeStats: { type: 'boolean', description: 'Include statistics', default: true },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      this.operationCount++;
      const startTime = Date.now();
      
      try {
        this.log('info', `Executing: ${request.params.name}`);
        
        let result;
        switch (request.params.name) {
          case 'execute_powershell': result = await this.executePowerShell(request.params.arguments); break;
          case 'run_powershell_script': result = await this.runPowerShellScript(request.params.arguments); break;
          case 'read_file': result = await this.readFile(request.params.arguments); break;
          case 'write_file': result = await this.writeFile(request.params.arguments); break;
          case 'list_directory': result = await this.listDirectory(request.params.arguments); break;
          case 'create_directory': result = await this.createDirectory(request.params.arguments); break;
          case 'copy_file': result = await this.copyFile(request.params.arguments); break;
          case 'move_file': result = await this.moveFile(request.params.arguments); break;
          case 'delete_file': result = await this.deleteFile(request.params.arguments); break;
          case 'get_file_info': result = await this.getFileInfo(request.params.arguments); break;
          case 'read_registry': result = await this.readRegistry(request.params.arguments); break;
          case 'write_registry': result = await this.writeRegistry(request.params.arguments); break;
          case 'execute_batch': result = await this.executeBatch(request.params.arguments); break;
          case 'create_batch_script': result = await this.createBatchScript(request.params.arguments); break;
          case 'list_modules': result = await this.listModules(request.params.arguments); break;
          case 'import_module': result = await this.importModule(request.params.arguments); break;
          case 'get_system_info': result = await this.getSystemInfo(request.params.arguments); break;
          case 'manage_services': result = await this.manageServices(request.params.arguments); break;
          case 'get_event_logs': result = await this.getEventLogs(request.params.arguments); break;
          case 'get_server_logs': result = await this.getServerLogs(request.params.arguments); break;
          default: throw new Error(`Unknown tool: ${request.params.name}`);
        }
        
        const duration = Date.now() - startTime;
        this.log('info', `Completed: ${request.params.name} (${duration}ms)`);
        return result;
        
      } catch (error) {
        this.errorCount++;
        const duration = Date.now() - startTime;
        this.log('error', `Failed: ${request.params.name} (${duration}ms)`, error.message);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              error: error.message,
              tool: request.params.name,
              timestamp: new Date().toISOString(),
              duration: `${duration}ms`,
              operation: this.operationCount,
              suggestion: this.getErrorSuggestion(error.message),
            }, null, 2),
          }],
        };
      }
    });
  }

  getErrorSuggestion(errorMessage) {
    if (errorMessage.includes('Access is denied')) return 'Try running with administrator privileges.';
    if (errorMessage.includes('path is not in allowed directories')) return 'Use allowed directories like Documents, Desktop, or Downloads.';
    if (errorMessage.includes('blocked operation')) return 'This command contains blocked operations for security.';
    if (errorMessage.includes('timeout')) return 'Try increasing timeout or simplifying the command.';
    return 'Check command syntax and parameters.';
  }

  async executePowerShell(args) {
    const { command, timeout = 30, loadModules = [] } = args;
    if (!command) throw new Error('Command is required');

    const commandLower = command.toLowerCase();
    for (const blocked of this.blockedCommands) {
      if (commandLower.includes(blocked)) {
        throw new Error(`Command contains blocked operation: ${blocked}`);
      }
    }

    let fullCommand = command;
    if (loadModules.length > 0) {
      const importCommands = loadModules.map(module => `Import-Module ${module} -ErrorAction SilentlyContinue`);
      fullCommand = importCommands.join('; ') + '; ' + command;
    }

    return this.runPowerShellCommand(fullCommand, timeout, { command, modulesLoaded: loadModules });
  }

  async runPowerShellScript(args) {
    const { scriptPath, parameters = [], timeout = 30 } = args;
    if (!scriptPath) throw new Error('Script path is required');
    if (!this.isPathAllowed(scriptPath)) throw new Error('Script path not in allowed directories');
    if (!scriptPath.endsWith('.ps1')) throw new Error('Script must be a .ps1 file');

    return new Promise((resolve, reject) => {
      const ps = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath, ...parameters], {
        stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true,
      });

      let stdout = '', stderr = '';
      ps.stdout.on('data', (data) => stdout += data.toString());
      ps.stderr.on('data', (data) => stderr += data.toString());

      const timeoutHandle = setTimeout(() => { ps.kill(); reject(new Error(`Script timed out after ${timeout} seconds`)); }, timeout * 1000);

      ps.on('close', (code) => {
        clearTimeout(timeoutHandle);
        resolve({
          content: [{
            type: 'text',
            text: JSON.stringify({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode: code, scriptPath, parameters, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
          }],
        });
      });

      ps.on('error', (error) => {
        clearTimeout(timeoutHandle);
        reject(new Error(`Failed to run script: ${error.message}`));
      });
    });
  }

  async runPowerShellCommand(command, timeout, extraData = {}) {
    return new Promise((resolve, reject) => {
      const ps = spawn('powershell.exe', ['-NoProfile', '-Command', command], {
        stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true,
      });

      let stdout = '', stderr = '';
      ps.stdout.on('data', (data) => stdout += data.toString());
      ps.stderr.on('data', (data) => stderr += data.toString());

      const timeoutHandle = setTimeout(() => { ps.kill(); reject(new Error(`Command timed out after ${timeout} seconds`)); }, timeout * 1000);

      ps.on('close', (code) => {
        clearTimeout(timeoutHandle);
        resolve({
          content: [{
            type: 'text',
            text: JSON.stringify({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode: code, timestamp: new Date().toISOString(), operation: this.operationCount, ...extraData }, null, 2),
          }],
        });
      });

      ps.on('error', (error) => {
        clearTimeout(timeoutHandle);
        reject(new Error(`Failed to execute: ${error.message}`));
      });
    });
  }

  async readFile(args) {
    const { filePath, encoding = 'utf8', maxSize = 1048576 } = args;
    if (!this.isPathAllowed(filePath)) throw new Error('File path not in allowed directories');

    const stats = await fs.stat(filePath);
    if (stats.size > maxSize) throw new Error(`File size exceeds maximum (${maxSize} bytes)`);

    const content = await fs.readFile(filePath, encoding);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ content, filePath, encoding, size: stats.size, lines: content.split('\n').length, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async writeFile(args) {
    const { filePath, content, encoding = 'utf8', append = false, backup = false } = args;
    if (!this.isPathAllowed(filePath)) throw new Error('File path not in allowed directories');

    if (backup && !append) {
      try {
        await fs.access(filePath);
        const backupPath = `${filePath}.backup.${Date.now()}`;
        await fs.copyFile(filePath, backupPath);
        this.log('info', `Backup created: ${backupPath}`);
      } catch (error) { /* File doesn't exist */ }
    }

    if (append) {
      await fs.appendFile(filePath, content, encoding);
    } else {
      await fs.writeFile(filePath, content, encoding);
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, filePath, operation: append ? 'append' : 'write', bytesWritten: Buffer.byteLength(content, encoding), backup, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async listDirectory(args) {
    const { dirPath, includeHidden = false, recursive = false, filter = '*', sortBy = 'name' } = args;
    if (!this.isPathAllowed(dirPath)) throw new Error('Directory path not in allowed directories');

    let command = `Get-ChildItem -Path "${dirPath}"`;
    if (recursive) command += ' -Recurse';
    if (includeHidden) command += ' -Force';
    if (filter !== '*') command += ` -Filter "${filter}"`;
    
    const sortProperty = sortBy === 'size' ? 'Length' : sortBy === 'date' ? 'LastWriteTime' : 'Name';
    command += ` | Sort-Object ${sortProperty} | Select-Object Name, FullName, Length, LastWriteTime, Attributes, PSIsContainer | ConvertTo-Json`;

    return this.runPowerShellCommand(command, 30, { dirPath, filter, sortBy });
  }

  async createDirectory(args) {
    const { dirPath, recursive = true } = args;
    if (!this.isPathAllowed(dirPath)) throw new Error('Directory path not in allowed directories');

    await fs.mkdir(dirPath, { recursive });
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, dirPath, operation: 'create_directory', recursive, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async copyFile(args) {
    const { sourcePath, destinationPath, overwrite = false } = args;
    if (!this.isPathAllowed(sourcePath) || !this.isPathAllowed(destinationPath)) {
      throw new Error('Source or destination path not in allowed directories');
    }

    const flags = overwrite ? 0 : fs.constants.COPYFILE_EXCL;
    const sourceStats = await fs.stat(sourcePath);
    await fs.copyFile(sourcePath, destinationPath, flags);
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, sourcePath, destinationPath, operation: 'copy_file', overwrite, size: sourceStats.size, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async moveFile(args) {
    const { sourcePath, destinationPath, overwrite = false } = args;
    if (!this.isPathAllowed(sourcePath) || !this.isPathAllowed(destinationPath)) {
      throw new Error('Source or destination path not in allowed directories');
    }

    if (!overwrite) {
      try {
        await fs.access(destinationPath);
        throw new Error('Destination exists and overwrite is false');
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    const sourceStats = await fs.stat(sourcePath);
    await fs.rename(sourcePath, destinationPath);
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, sourcePath, destinationPath, operation: 'move_file', overwrite, size: sourceStats.size, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async deleteFile(args) {
    const { filePath, recursive = false, useRecycleBin = true } = args;
    if (!this.isPathAllowed(filePath)) throw new Error('File path not in allowed directories');

    const stats = await fs.stat(filePath);
    
    if (useRecycleBin) {
      const command = `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("${filePath}", 'OnlyErrorDialogs', 'SendToRecycleBin')`;
      await this.runPowerShellCommand(command, 30);
    } else {
      if (stats.isDirectory()) {
        await fs.rmdir(filePath, { recursive });
      } else {
        await fs.unlink(filePath);
      }
    }
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, filePath, operation: 'delete_file', type: stats.isDirectory() ? 'directory' : 'file', recursive, useRecycleBin, size: stats.size, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async getFileInfo(args) {
    const { filePath, includeHash = false } = args;
    if (!this.isPathAllowed(filePath)) throw new Error('File path not in allowed directories');

    const stats = await fs.stat(filePath);
    let fileHash = null;
    
    if (includeHash && stats.isFile()) {
      const command = `Get-FileHash "${filePath}" -Algorithm SHA256 | Select-Object -ExpandProperty Hash`;
      const hashResult = await this.runPowerShellCommand(command, 30);
      const hashData = JSON.parse(hashResult.content[0].text);
      fileHash = hashData.stdout.trim();
    }
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ filePath, size: stats.size, type: stats.isDirectory() ? 'directory' : 'file', created: stats.birthtime, modified: stats.mtime, accessed: stats.atime, permissions: stats.mode, isReadOnly: !(stats.mode & 0o200), hash: fileHash, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async readRegistry(args) {
    const { keyPath, valueName = '', recurse = false } = args;
    if (!this.isRegistryKeyAllowed(keyPath)) throw new Error('Registry key not in allowed locations');

    let command;
    if (valueName) {
      command = `Get-ItemProperty -Path "${keyPath}" -Name "${valueName}" | ConvertTo-Json`;
    } else if (recurse) {
      command = `Get-ChildItem -Path "${keyPath}" -Recurse | Get-ItemProperty | ConvertTo-Json`;
    } else {
      command = `Get-ItemProperty -Path "${keyPath}" | ConvertTo-Json`;
    }

    return this.runPowerShellCommand(command, 30, { keyPath, valueName, recurse });
  }

  async writeRegistry(args) {
    const { keyPath, valueName, value, valueType = 'String' } = args;
    if (!this.isRegistryKeyAllowed(keyPath)) throw new Error('Registry key not in allowed locations');
    if (!keyPath.toUpperCase().startsWith('HKCU:')) throw new Error('Registry writes only allowed in HKEY_CURRENT_USER');

    const command = `Set-ItemProperty -Path "${keyPath}" -Name "${valueName}" -Value "${value}" -Type ${valueType}`;
    return this.runPowerShellCommand(command, 30, { keyPath, valueName, value, valueType });
  }

  async executeBatch(args) {
    const { scriptPath, parameters = [], timeout = 30, environmentVars = {} } = args;
    if (!this.isPathAllowed(scriptPath)) throw new Error('Script path not in allowed directories');
    if (!scriptPath.endsWith('.bat') && !scriptPath.endsWith('.cmd')) throw new Error('Script must be .bat or .cmd file');

    return new Promise((resolve, reject) => {
      const workDir = path.dirname(scriptPath);
      const env = { ...process.env, ...environmentVars };
      
      const bat = spawn('cmd.exe', ['/c', scriptPath, ...parameters], {
        stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true, cwd: workDir, env: env,
      });

      let stdout = '', stderr = '';
      bat.stdout.on('data', (data) => stdout += data.toString());
      bat.stderr.on('data', (data) => stderr += data.toString());

      const timeoutHandle = setTimeout(() => { bat.kill(); reject(new Error(`Batch script timed out after ${timeout} seconds`)); }, timeout * 1000);

      bat.on('close', (code) => {
        clearTimeout(timeoutHandle);
        resolve({
          content: [{
            type: 'text',
            text: JSON.stringify({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode: code, scriptPath, parameters, workingDirectory: workDir, environmentVars, timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
          }],
        });
      });

      bat.on('error', (error) => {
        clearTimeout(timeoutHandle);
        reject(new Error(`Failed to execute batch script: ${error.message}`));
      });
    });
  }

  async createBatchScript(args) {
    const { scriptPath, content, template = '', variables = {} } = args;
    if (!this.isPathAllowed(scriptPath)) throw new Error('Script path not in allowed directories');
    if (!scriptPath.endsWith('.bat') && !scriptPath.endsWith('.cmd')) throw new Error('Script must have .bat or .cmd extension');

    let scriptContent = content;

    if (template) {
      const templates = {
        basic: `@echo off\necho Starting script...\n${content}\necho Script completed.\npause`,
        service: `@echo off\ntitle Service Management Script\necho Managing services...\n${content}\nif %errorlevel% neq 0 (\n    echo Error occurred: %errorlevel%\n    pause\n    exit /b %errorlevel%\n)\necho Service operation completed successfully.`,
        backup: `@echo off\ntitle Backup Script\nset BACKUP_DATE=%date:~-4,4%%date:~-10,2%%date:~-7,2%\necho Starting backup on %BACKUP_DATE%\n${content}\necho Backup completed on %date% at %time%`
      };

      if (templates[template]) {
        scriptContent = templates[template];
      }
    }

    for (const [key, value] of Object.entries(variables)) {
      scriptContent = scriptContent.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value);
    }

    await fs.writeFile(scriptPath, scriptContent, 'utf8');

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, scriptPath, operation: 'create_batch_script', template, variables, size: Buffer.byteLength(scriptContent, 'utf8'), timestamp: new Date().toISOString(), operation: this.operationCount }, null, 2),
      }],
    };
  }

  async listModules(args) {
    const { listType = 'imported', filter = '*' } = args;

    let command;
    switch (listType) {
      case 'available':
        command = `Get-Module -ListAvailable -Name "${filter}" | Select-Object Name, Version, Description, ModuleBase | ConvertTo-Json`;
        break;
      case 'imported':
        command = `Get-Module -Name "${filter}" | Select-Object Name, Version, Description, ExportedCommands | ConvertTo-Json`;
        break;
      case 'all':
        command = `Get-Module -ListAvailable -Name "${filter}" | Select-Object Name, Version, Description, ModuleBase, @{Name='Imported';Expression={if(Get-Module $_.Name){$true}else{$false}}} | ConvertTo-Json`;
        break;
      default:
        throw new Error('Invalid listType. Use: available, imported, or all');
    }

    return this.runPowerShellCommand(command, 30, { listType, filter });
  }

  async importModule(args) {
    const { moduleName, force = false } = args;

    let command = `Import-Module "${moduleName}"`;
    if (force) command += ' -Force';
    command += `; Get-Module "${moduleName}" | Select-Object Name, Version, ExportedCommands | ConvertTo-Json`;

    return this.runPowerShellCommand(command, 30, { moduleName, force });
  }

  async getSystemInfo(args) {
    const { category = 'all', detailed = false } = args;

    let commands = [];

    if (category === 'all' || category === 'hardware') {
      commands.push('Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, TotalPhysicalMemory, CsProcessors, CsSystemType');
      if (detailed) {
        commands.push('Get-WmiObject -Class Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed');
        commands.push('Get-WmiObject -Class Win32_PhysicalMemory | Select-Object Capacity, Speed, Manufacturer');
      }
    }

    if (category === 'all' || category === 'software') {
      commands.push('Get-WmiObject -Class Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture, LastBootUpTime');
      if (detailed) {
        commands.push('Get-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" | Select-Object ProductName, ReleaseId, CurrentBuild');
      }
    }

    if (category === 'all' || category === 'network') {
      commands.push('Get-NetAdapter | Where-Object Status -eq "Up" | Select-Object Name, InterfaceDescription, LinkSpeed');
      if (detailed) {
        commands.push('Get-NetIPAddress | Where-Object AddressFamily -eq "IPv4" | Select-Object InterfaceAlias, IPAddress, PrefixLength');
      }
    }

    const command = commands.join('; echo "---SEPARATOR---"; ');
    return this.runPowerShellCommand(command, 60, { category, detailed });
  }

  async manageServices(args) {
    const { action, serviceName = '', filter = '*' } = args;

    let command;
    switch (action) {
      case 'list':
        command = `Get-Service -Name "${filter}" | Select-Object Name, Status, StartType, DisplayName | Sort-Object Name | ConvertTo-Json`;
        break;
      case 'status':
        if (!serviceName) throw new Error('Service name is required for status action');
        command = `Get-Service -Name "${serviceName}" | Select-Object Name, Status, StartType, DisplayName | ConvertTo-Json`;
        break;
      case 'start':
        if (!serviceName) throw new Error('Service name is required for start action');
        command = `Start-Service -Name "${serviceName}"; Get-Service -Name "${serviceName}" | Select-Object Name, Status | ConvertTo-Json`;
        break;
      case 'stop':
        if (!serviceName) throw new Error('Service name is required for stop action');
        command = `Stop-Service -Name "${serviceName}" -Force; Get-Service -Name "${serviceName}" | Select-Object Name, Status | ConvertTo-Json`;
        break;
      case 'restart':
        if (!serviceName) throw new Error('Service name is required for restart action');
        command = `Restart-Service -Name "${serviceName}" -Force; Get-Service -Name "${serviceName}" | Select-Object Name, Status | ConvertTo-Json`;
        break;
      default:
        throw new Error('Invalid action. Use: list, status, start, stop, restart');
    }

    return this.runPowerShellCommand(command, 30, { action, serviceName, filter });
  }

  async getEventLogs(args) {
    const { logName = 'System', maxEvents = 50, level = '', hours = 24 } = args;

    const startTime = new Date(Date.now() - (hours * 60 * 60 * 1000)).toISOString();
    
    let command = `Get-WinEvent -FilterHashtable @{LogName='${logName}'; StartTime='${startTime}'}`;
    
    if (level) {
      const levelMap = { 'Error': 2, 'Warning': 3, 'Information': 4 };
      if (levelMap[level]) {
        command = `Get-WinEvent -FilterHashtable @{LogName='${logName}'; Level=${levelMap[level]}; StartTime='${startTime}'}`;
      }
    }
    
    command += ` | Select-Object -First ${maxEvents} TimeCreated, Id, LevelDisplayName, ProviderName, Message | ConvertTo-Json`;

    return this.runPowerShellCommand(command, 60, { logName, maxEvents, level, hours });
  }

  async getServerLogs(args) {
    const { level = 'all', maxEntries = 100, includeStats = true } = args;

    let filteredLogs = this.logs;
    
    if (level !== 'all') {
      filteredLogs = this.logs.filter(log => log.level.toLowerCase() === level.toLowerCase());
    }
    
    const recentLogs = filteredLogs.slice(-maxEntries);
    
    const result = {
      logs: recentLogs,
      logCount: filteredLogs.length,
      totalLogs: this.logs.length,
    };

    if (includeStats) {
      const uptime = Date.now() - this.startTime.getTime();
      result.statistics = {
        serverStartTime: this.startTime.toISOString(),
        uptime: `${Math.floor(uptime / 1000)} seconds`,
        totalOperations: this.operationCount,
        totalErrors: this.errorCount,
        successRate: this.operationCount > 0 ? ((this.operationCount - this.errorCount) / this.operationCount * 100).toFixed(2) + '%' : '100%',
        averageOperationsPerHour: Math.round((this.operationCount / (uptime / 3600000)) * 100) / 100,
      };
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2),
      }],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    this.log('info', 'Ultimate PowerShell MCP Server v3.0 running - All 20 tools loaded!');
  }
}

const server = new UltimatePowerShellMCPServer();
server.run().catch(console.error);