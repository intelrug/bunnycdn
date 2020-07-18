# @intelrug/bunnycdn

> BunnyCDN node bindings

### Install

```bash
$ yarn add @intelrug/bunnycdn
```

### Usage

#### import
``` javascript
import { BunnyCDN } from '@intelrug/bunnycdn';
...
const bunny = new BunnyCDN({
    apiAccessKey: 'your-key',
    storageZones: [{
        name: 'your-storage-zone-name',
        accessKey: 'your-storage-zone-access-key'
    }],
});
...
```

#### Storage 

All files in Storage Zone
``` javascript
const files: StorageZoneFile[] = await bunny.storage.get('your-storage-zone-name');
```

Get contents of specific file
``` javascript
const fileContents: string = await bunny.storage
    .getFile('your-storage-zone-name', 'somepath/script.js');
```

Create a file or update contents of specific file
``` javascript
bunny.storage.update(
    'your-storage-zone-name',
    'somepath/script.js',
    'console.log(\'I was updated\');'
);
```

Delete specific file
``` javascript
bunny.storage.delete('your-storage-zone-name', 'somepath/script.js');
```

#### Bunny API

Get Billing 
``` javascript
const billing: Billing = await bunny.billing();
```

Get Statistics
``` javascript
const stats : Statistic = await bunny.statistics();
```

Purge File Cache
``` javascript
bunny.purge('http://your-zone/somepath/filetopurge.css');
```

HardUpdate File (Update and Purge)
``` javascript
bunny.hardUpdate(
    'https://your-domain.com',
    'your-storage',
    'somepath',
    'fileName.css',
    'new file contents'
);
```
