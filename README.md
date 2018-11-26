# NPM MSDeploy

This is a wrapper around Microsoft msdeploy that can be used in npm scripts.

Web Deploy (msdeploy) simplifies deployment of Web applications and Web sites to IIS servers.

To use this npm module you are required to have msdeploy installed on your machine. [You can install it from here](https://www.iis.net/downloads/microsoft/web-deploy) 

_This module is only available for windows_

### Install
```
npm install msdeploy --save
```
### Examples
_Examples to deploy to azure:_

##### CLI:

```
msdeploy --verb sync --allowUntrusted true --source package=dist.zip --dest auto,ComputerName={{ComputerName}},UserName={{UserName}},Password={{Password}},AuthType=Basic,includeAcls=False"
```
_Note: Replace {{ComputerName}}, {{UserName}}, {{Password}} with appropriate values._

##### NPM script:

The following example can be used within package.json file. 
The values in config can be set manually or set via CLI or deployment script.

```
"scripts": {
    "deploy": "msdeploy --verb sync --allowUntrusted true --source package=dist.zip --dest %npm_package_config_dest%,ComputerName=%npm_package_config_ComputerName%,UserName=%npm_package_config_UserName%,Password=%npm_package_config_Password%,AuthType=Basic,includeAcls=False"
  },
  "config": {
    "ComputerName": "",
    "UserName": "",
    "Password": "",
    "dest": "auto"
  },
```

To set config values the following command can be used via CLI or deployment script.

```
npm run deploy --NAME_OF_THE_PACKAGE:ComputerName="Computer name" --NAME_OF_THE_PACKAGE:Username="UserName" --NAME_OF_THE_PACKAGE:Password="Password"
```

_NAME_OF_THE_PACKAGE should be replaced with the name specified in package.json_

### Accepted params
You can use any msdeploy parameters. View some of them here: [Web Deploy Command Line Syntax](https://technet.microsoft.com/en-us/library/dd569106(v=ws.10).aspx)

```
-verb:<name>                   Action to perform (required).
-source:<object>               The source object for the operation (required).
-dest:<object>                 The destination object for the operation.
-declareParam:<params>         Declares a parameter for synchronization.
-setParam:<params>             Sets a parameter for synchronization.
-setParamFile:<xmlfile>        Applies parameter settings from an XML file.
-declareParamFile:<xmlfile>    Includes parameter declarations from an XML file.
-removeParam:<name>            Removes a parameter from the list of declared parameters.
-disableLink:<name>            Disables the specified link extension(s).
-enableLink:<name>             Enables the specified link extension(s).
-disableRule:<name>            Disables the specified synchronization rule(s).
-enableRule:<name>             Enables the specified synchronization rule(s).
-replace:<arg settings>        Specifies an attribute replacement rule.
-retryAttempts                 The number of times a provider will retry after a failed action (not all providers support retrying). Defaults to 5.
-retryInterval                 Interval in milliseconds between retry attempts (-retryAttempts). The default is 1000.
-skip:<arg settings>           Specifies an object to skip during synchronization.
-disableSkipDirective:<name>   Disables the specified skip directive.
-enableSkipDirective:<name>    Enables the specified skip directive.
-verbose                       Enables more verbose output.
-whatif                        Displays what would have happened without actually performing any operations.
-disableAppStore               Disables saving to the application store during a sync.
-xpath:<path>                  An XPath expression to apply to XML output.
-xml                           Return results in XML format.
-allowUntrusted                Allow untrusted server certificate when using SSL.
-showSecure                    Show secure attributes in XML output instead of hiding them.^
-preSync:<command>             A command to execute before the synchronization on the destination.  For instance, net stop a service.
-postSync:<command>            A command to execute after the synchronization on the destination.  For instance, net start a service.

----------------------------------------------------------------------------------------

Supported Verbs:

dump                           Displays the details of the specified source object.
sync                           Synchronizes the destination object with the source object.
delete                         Deletes specified destination object.
getDependencies                Retrieve dependencies for given object
getParameters                  Return parameters supported by object
getSystemInfo                  Retrieve system information associated with given object

----------------------------------------------------------------------------------------

Supported provider-types (and sample paths, if applicable):

appHostAuthOverride            Modifies IIS inheritance rules for different authentication settings to either allow or deny them to be overridden in a site's web.config file.
appHostConfig                  IIS 7 configuration
appHostSchema                  IIS 7 configuration schema
appPoolConfig                  IIS 7 Application Pool
appPoolEnable32Bit             Enable 32-bit application pool on IIS7.
appPoolNetFx                   The appPoolNetFx provider displays or sets the .NET Framework version of an IIS application pool.
appPoolPipeline                The appPoolPipeline provider displays or sets the managed pipeline mode of the specified IIS application pool.
archiveDir                     Archive directory
auto                           Automatic destination
backupManager                  Allows you to create, list, restore, and delete backups.
backupSettings                 Manages your site's backup settings
cert                           Certificate
certStoreSettings              This provider is used to sync Centralized SSL Certificates Support store settings. It does not require any path to be specified and can only be utilized on IIS 8 and later.
comObject32                    32-bit COM object
comObject64                    64-bit COM object
contentPath                    File System Content
contentPathLib                 Used to deploy ASP.Net libraries that live in the 'approot' folder, which is a sibling to the content root folder.
createApp                      Defines an application in the IIS configuration system.
dbDacFx                        Deploy SQL database using DACFx API
dbFullSql                      Deploy SQL database
dbMySql                        Deploy MySQL database
dbSqlite                       Deploy SQLite database
dirPath                        Directory
fcgiExtConfig                  FcgiExt.ini settings or fastCgi section configuration
filePath                       File
gacAssembly                    GAC assembly
gacInstall                     Signed Assembly GAC Installer
iisApp                         Web Application
machineConfig32                .NET 32-bit machine configuration
machineConfig64                .NET 64-bit machine configuration
manifest                       Custom manifest file
metaKey                        Metabase key
package                        A .zip file package
recycleApp                     Recycles, starts, or stops an application's app pool, or unloads an application's app domains on IIS 7.
regKey                         Registry key
regValue                       Registry value
rootWebConfig32                .NET 32-bit root Web configuration
rootWebConfig64                .NET 64-bit root Web configuration
runCommand                     Runs a command on the destination when sync is called.
setAcl                         Grant permissions
urlScanConfig                  UrlScan.ini settings or requestFiltering section configuration
webServer                      Full IIS 7 Web server
webServer60                    Full IIS 6 Web server

----------------------------------------------------------------------------------------

Common settings (can be used with all providers):

computerName=<name>               Name of remote computer or proxy-URL
wmsvc=<name>                      Name of remote computer or proxy-URL for the Web Management Service (WMSvc). Assumes that the service is listening on port 8172.
authtype=<name>                   Authentication scheme to use. NTLM is the default setting. If the wmsvc option is specified, then Basic is the default setting.
userName=<name>                   User name to authenticate for remote connections (required if using Basic authentication).
password=<password>               Password of the user for remote connections (required if using Basic authentication).
storeCredentials=<target>         Username and password will be stored in the Windows Credential Manager under the target identifier.
getCredentials=<target>           Target identifies the credentials (username and password) in the Windows Credential Manager to be used when connecting to remote computer.
encryptPassword=<pwd>             Password to use for encrypting/decrypting any secure data.
includeAcls=<bool>                If true, include ACLs in the operation (applies to the file system, registry, and metabase).
tempAgent=<bool>                  Temporarily install the remote agent for the duration of a remote operation.
publishSettings=<filePath>        File path to a publish settings file which contains remote connection information.
```
