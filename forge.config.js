module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl:"https://picsum.photos/200/300"
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        iconUrl:"https://picsum.photos/200/300"
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        iconUrl:"https://picsum.photos/200/300"
      },
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'MiticNatalija',
          name: 'electron-wrapper'
        },
        prerelease: true
      }
    }
  ]
};
