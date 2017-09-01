# NPM MSDeploy

This is a wrapper around Microsoft msdeploy that can be used in npm scripts.

### Install

### Use

### Accepted params
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
```