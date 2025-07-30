import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"6a152889-4b23-4618-a7d9-9f82ec4c3d45","homePageId":"b6f5f428-ca6e-4ed2-a8ec-296b35c90200","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":{},"defaultTheme":"dark","langs":[{"lang":"ko","default":true,"isDefaultPath":false}],"background":{"backgroundOrder":"grad,img,col"},"workflows":[{"id":"8a2f5d3c-51a0-443e-bbd9-79468544b8f1","name":"Initialize Dark Mode","actions":{"ad745188-193c-4728-b46a-ef3fd1245c6b":{"id":"ad745188-193c-4728-b46a-ef3fd1245c6b","code":"// Get the document and window objects safely\nconst doc = wwLib.getFrontDocument();\nconst win = wwLib.getFrontWindow();\n\n// Function to apply theme\nconst applyTheme = (isDark) => {\n  try {\n    // Set the theme value\n    const themeName = isDark ? 'dark' : 'light';\n    \n    // Update the theme variable\n    variables['0c3d472b-034c-46c8-a10c-8f874093b17f'] = themeName;\n    \n    // Set WeWeb theme\n    utilsFunctions.setTheme(themeName);\n    \n    // Add or remove dark mode class\n    if (doc && doc.documentElement) {\n      if (isDark) {\n        doc.documentElement.classList.add('ww-dark-theme');\n        doc.documentElement.classList.remove('ww-light-mode');\n      } else {\n        doc.documentElement.classList.remove('ww-dark-theme');\n        doc.documentElement.classList.add('ww-light-mode');\n      }\n    }\n  } catch (error) {\n    console.error('Error applying theme:', error);\n  }\n};\n\ntry {\n  // Check if the user has a saved preference in localStorage\n  let savedTheme = null;\n  try {\n    savedTheme = win.localStorage.getItem('theme');\n  } catch (storageError) {\n    console.error('Failed to access localStorage:', storageError);\n  }\n  \n  if (savedTheme === 'dark' || savedTheme === 'light') {\n    // Use saved preference\n    applyTheme(savedTheme === 'dark');\n  } else {\n    // Fall back to system preference\n    const prefersDarkMode = win.matchMedia && win.matchMedia('(prefers-color-scheme: dark)').matches;\n    applyTheme(prefersDarkMode);\n  }\n  \n  // Listen for system theme changes if no user preference is saved\n  const darkModeMediaQuery = win.matchMedia('(prefers-color-scheme: dark)');\n  if (darkModeMediaQuery && darkModeMediaQuery.addEventListener) {\n    const handleThemeChange = (e) => {\n      try {\n        // Only apply system theme if no user preference is saved\n        let userTheme = null;\n        try {\n          userTheme = win.localStorage.getItem('theme');\n        } catch (storageError) {\n          console.error('Failed to access localStorage:', storageError);\n        }\n        \n        if (!userTheme) {\n          applyTheme(e.matches);\n        }\n      } catch (error) {\n        console.error('Error in theme change handler:', error);\n      }\n    };\n    \n    // Remove any existing listeners to prevent duplicates\n    try {\n      darkModeMediaQuery.removeEventListener('change', handleThemeChange);\n    } catch (removeError) {\n      // Ignore errors from removeEventListener\n    }\n    \n    // Add the listener\n    darkModeMediaQuery.addEventListener('change', handleThemeChange);\n  }\n  \n  // Set initial sidebar state based on screen size\n  const windowWidth = win.innerWidth;\n  const isDesktop = windowWidth >= 768;\n  \n  if (isDesktop) {\n    variables['50ad1c50-6c13-43d0-bb91-94dbd596f390'] = true; // Expanded on desktop\n  } else {\n    variables['50ad1c50-6c13-43d0-bb91-94dbd596f390'] = false; // Collapsed on mobile\n  }\n} catch (error) {\n  console.error('Error initializing theme:', error);\n  \n  // Fallback to light theme if there's an error\n  variables['0c3d472b-034c-46c8-a10c-8f874093b17f'] = 'light';\n  utilsFunctions.setTheme('light');\n}","next":null,"type":"custom-js"}},"trigger":"onload-app","description":"Set up dark mode based on system preference and handle theme changes using Material Design 3 purple theme colors","firstAction":"ad745188-193c-4728-b46a-ef3fd1245c6b","firstErrorAction":null},{"id":"1eb75b9c-7dfe-4104-9ab8-57ca74c871d4","name":"Initialize Dark Mode","actions":{"bd9a1640-62bf-40ae-a364-ae4a263a7314":{"id":"bd9a1640-62bf-40ae-a364-ae4a263a7314","code":"// Get the current theme from local storage or use system preference\nconst savedTheme = variables['0c3d472b-034c-46c8-a10c-8f874093b17f'];\nconst prefersDarkMode = wwLib.getFrontWindow().matchMedia && wwLib.getFrontWindow().matchMedia('(prefers-color-scheme: dark)').matches;\n\n// Set initial theme if not already set\nif (!savedTheme) {\n  variables['0c3d472b-034c-46c8-a10c-8f874093b17f'] = prefersDarkMode ? 'dark' : 'light';\n}\n\n// Apply theme to document\nconst doc = wwLib.getFrontDocument();\nif (doc && doc.documentElement) {\n  if (variables['0c3d472b-034c-46c8-a10c-8f874093b17f'] === 'dark') {\n    doc.documentElement.classList.add('ww-dark-theme');\n  } else {\n    doc.documentElement.classList.remove('ww-dark-theme');\n  }\n}\n\n// Listen for system theme changes\nconst mediaQuery = wwLib.getFrontWindow().matchMedia('(prefers-color-scheme: dark)');\nif (mediaQuery && mediaQuery.addEventListener) {\n  mediaQuery.addEventListener('change', (e) => {\n    if (e.matches) {\n      // System switched to dark mode\n      variables['0c3d472b-034c-46c8-a10c-8f874093b17f'] = 'dark';\n      doc.documentElement.classList.add('ww-dark-theme');\n    } else {\n      // System switched to light mode\n      variables['0c3d472b-034c-46c8-a10c-8f874093b17f'] = 'light';\n      doc.documentElement.classList.remove('ww-dark-theme');\n    }\n  });\n}\n\n// Initialize sidebar state based on device type\nconst windowWidth = wwLib.getFrontWindow().innerWidth;\nconst isMobile = windowWidth < 768;\n\n// Try to get saved sidebar state from localStorage\nlet savedSidebarState = null;\ntry {\n  savedSidebarState = wwLib.getFrontWindow().localStorage.getItem('sidebarExpanded');\n  // Convert string to boolean\n  if (savedSidebarState === 'true') savedSidebarState = true;\n  if (savedSidebarState === 'false') savedSidebarState = false;\n} catch (error) {\n  console.error('Failed to access localStorage for sidebar state:', error);\n}\n\n// Set sidebar state based on device and saved preference\nif (savedSidebarState !== null) {\n  // Use saved preference if available\n  variables['50ad1c50-6c13-43d0-bb91-94dbd596f390'] = savedSidebarState;\n} else {\n  // Default behavior: expanded on desktop, collapsed on mobile\n  variables['50ad1c50-6c13-43d0-bb91-94dbd596f390'] = !isMobile;\n}\n\n// Add responsive behavior for sidebar\nconst handleResize = () => {\n  const currentWidth = wwLib.getFrontWindow().innerWidth;\n  const currentIsMobile = currentWidth < 768;\n  \n  // If transitioning from mobile to desktop, ensure sidebar is expanded\n  if (!currentIsMobile && isMobile) {\n    variables['50ad1c50-6c13-43d0-bb91-94dbd596f390'] = true;\n  }\n  \n  // If transitioning from desktop to mobile, collapse sidebar\n  if (currentIsMobile && !isMobile) {\n    variables['50ad1c50-6c13-43d0-bb91-94dbd596f390'] = false;\n  }\n};\n\n// Add resize listener to handle screen size changes\nwwLib.getFrontWindow().addEventListener('resize', handleResize);","next":null,"type":"custom-js"}},"trigger":"onload-app","description":"Set up dark mode based on system preference and handle theme changes using Material Design 3 purple theme colors. Also initialize sidebar state to be collapsed on mobile by default.","firstAction":"bd9a1640-62bf-40ae-a364-ae4a263a7314","firstErrorAction":null},{"id":"5838c610-1635-4686-97eb-31a565b2428b","name":"Ensure Mobile Scrolling on Resize","actions":{"57bcbaf6-2e65-40a3-a3da-5916aa00e15b":{"id":"57bcbaf6-2e65-40a3-a3da-5916aa00e15b","code":"// Call the function to ensure mobile scrolling\nutilsFunctions.executeGlobalFunction['8b74ead7-9b70-4fe9-9991-d9d83c5bd7c5']();","next":null,"type":"custom-js"}},"trigger":"page-resize","description":"Ensures content remains scrollable when resizing to mobile","firstAction":"57bcbaf6-2e65-40a3-a3da-5916aa00e15b","firstErrorAction":null},{"id":"2bc27f93-3190-42ee-a45a-ecd7f8a8990e","name":"Initialize Popup Mobile Scrolling","actions":{"8a14689a-4930-4c6a-a1a6-11ab948c9763":{"id":"8a14689a-4930-4c6a-a1a6-11ab948c9763","code":"// Get window width\nconst windowWidth = wwLib.getFrontWindow().innerWidth;\nconst isMobile = windowWidth < 768;\n\nif (isMobile) {\n  // Apply mobile-specific styles to popups after a short delay to ensure DOM is ready\n  setTimeout(() => {\n    // Apply mobile-specific styles to popups\n    const popupContents = wwLib.getFrontDocument().querySelectorAll('[data-weweb-id=\"a3ea38ab-d370-4c12-ba49-44c9c4848a7e\"], [data-weweb-id=\"d2c5eb8a-f564-4ce5-bdea-501ece37e303\"], [data-weweb-id=\"faea991a-2b70-4b2a-9d0e-579609db6c4b\"], [data-weweb-id=\"4c268bba-6041-47be-afce-60d78287dbae\"]');\n    popupContents.forEach(content => {\n      if (content) {\n        content.style.maxHeight = '80vh';\n        content.style.overflowY = 'auto';\n        content.style.width = '90%';\n        content.style.maxWidth = '100%';\n        content.style.WebkitOverflowScrolling = 'touch'; // Enable momentum scrolling on iOS\n      }\n    });\n    \n    // Ensure popup content sections have proper spacing\n    const popupContentSections = wwLib.getFrontDocument().querySelectorAll('[data-weweb-id=\"575ec786-0d15-4502-bff1-cf94d31b4314\"], [data-weweb-id=\"7c1a2b37-339b-42e6-9599-a51cf07b85d7\"], [data-weweb-id=\"f30dda82-37d6-4189-923b-f16c96542aa9\"], [data-weweb-id=\"ec865b6b-a3fb-47e6-9798-71be00411fbc\"]');\n    popupContentSections.forEach(section => {\n      if (section) {\n        section.style.height = 'auto';\n        section.style.overflowY = 'visible';\n        section.style.padding = '16px';\n      }\n    });\n  }, 500);\n}","next":null,"type":"custom-js"}},"trigger":"onload","description":"Ensures all popups have proper scrolling behavior on mobile devices","firstAction":"8a14689a-4930-4c6a-a1a6-11ab948c9763","firstErrorAction":null}],"pages":[{"id":"0e0bfde7-7acd-49b4-9b29-530d87454f96","linkId":"0e0bfde7-7acd-49b4-9b29-530d87454f96","name":"terms","folder":null,"paths":{"ko":"terms","default":"terms"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"9f522eff-d66b-4494-864a-50fc333c76e9","sectionTitle":"Section","linkId":"b1e54dbe-85ce-4778-b5fc-4927a9963063"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"6f159b78-1834-4615-a91c-a3151c732a10","linkId":"6f159b78-1834-4615-a91c-a3151c732a10","name":"SignUp","folder":null,"paths":{"ko":"sign_in","default":"sign_in"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"452c796a-120b-4bf5-822c-8bb6ff774962","sectionTitle":"Material Snackbar Container","linkId":"b90c3c33-43f8-4349-a166-9a6614adf3dc"},{"uid":"9d478949-dfa3-4bbc-b108-48833095d569","sectionTitle":"Sign in","linkId":"6e6c6034-7a03-4d90-b22a-07965a537932"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"c3ba165a-e259-4a29-8743-fe17ffb36e4a","linkId":"c3ba165a-e259-4a29-8743-fe17ffb36e4a","name":"SignIn","folder":null,"paths":{"ko":"signup","default":"signup"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"b5e4d528-009d-4238-9a93-5b1f0d1e44fd","sectionTitle":"Material Snackbar Container","linkId":"0182ade7-e4a0-4a6d-8701-f076909ba237"},{"uid":"29545118-0b42-48cc-bfe0-c5dc5a048c4d","sectionTitle":"Sign in","linkId":"31c07d61-d7a0-433d-a79d-aa9480a5ce6c"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"de53e417-f90b-4591-aea1-c2590d0a1282","linkId":"de53e417-f90b-4591-aea1-c2590d0a1282","name":"Settings","folder":null,"paths":{"ko":"settings","default":"settings"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"ef9bb566-578c-42e2-b6b2-4a3ac8404275","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"83bfc545-2c2f-42a2-b8bd-8998ec9e9dc0","sectionTitle":"Header","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"4ca7e3cd-aef8-4c3f-a460-4652145923f1","sectionTitle":"Content","linkId":"da50435c-594c-4c49-9959-baa9f60af409"}],"pageUserGroups":[],"title":{"en":"Blank | Start from scratch","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"194cd6af-5f88-4b42-ba31-8bdac666f703","linkId":"194cd6af-5f88-4b42-ba31-8bdac666f703","name":"Users","folder":null,"paths":{"ko":"users","default":"users"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"83bfc545-2c2f-42a2-b8bd-8998ec9e9dc0","sectionTitle":"Header","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"ef9bb566-578c-42e2-b6b2-4a3ac8404275","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"7841dcdf-db03-4388-bd56-4d1a6d4c69a1","sectionTitle":"Content","linkId":"6271a9ca-81dc-4105-8a94-44087979973f"},{"uid":"69c84088-0733-4d7f-8e65-63409bcb1771","sectionTitle":"Modal","linkId":"b473a8bc-ea8b-47bf-9895-8fb6f79c5164"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"839f73b8-fc29-4a41-b3d1-66caf3ba4143","linkId":"839f73b8-fc29-4a41-b3d1-66caf3ba4143","name":"empty","folder":null,"paths":{"en":"log_in","ko":"hom","default":"hom"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"9d478949-dfa3-4bbc-b108-48833095d569","sectionTitle":"Sign in","linkId":"6e6c6034-7a03-4d90-b22a-07965a537932"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"4bc20d27-362f-4595-91f6-27f5586b0901","linkId":"4bc20d27-362f-4595-91f6-27f5586b0901","name":"Locations","folder":null,"paths":{"ko":"deals","default":"deals"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"83bfc545-2c2f-42a2-b8bd-8998ec9e9dc0","sectionTitle":"Header","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"ef9bb566-578c-42e2-b6b2-4a3ac8404275","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"b0bd5954-a34e-473f-8a4c-db7523b825c7","sectionTitle":"Content","linkId":"d9a2a5c6-0091-404c-8860-cc25b6f6cd78"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"cf61eea6-2e67-4219-9b80-7991f577bad9","linkId":"cf61eea6-2e67-4219-9b80-7991f577bad9","name":"HomeS","folder":null,"paths":{"ko":"homes","default":"homes"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"66464e0b-18fe-408c-9d71-7e495a6b8831","sectionTitle":"Sidebar Section","linkId":"0711b28f-175e-4a47-aad5-a9add5894489"},{"uid":"1ba64b32-046a-4f71-abb2-f50fa02fbddd","sectionTitle":"Main Content Section","linkId":"f1dc9908-ffff-4687-bbe1-9c1fd53060c0"},{"uid":"46555320-2865-450d-aabf-63391dad29ce","sectionTitle":"Backdrop Section","linkId":"77a038e2-1e15-4442-b17d-6999dd1019f8"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"dd7e5aaf-0f6c-4cf8-8dcf-c127183df36c","linkId":"dd7e5aaf-0f6c-4cf8-8dcf-c127183df36c","name":"HomeSs","folder":null,"paths":{"ko":"homess","default":"homess"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"a623d3fe-0173-4fc2-a78e-09ec6b9c7f22","sectionTitle":"Sidebar Section","linkId":"25ec4b40-7f31-480f-ae0b-f211eb48c941"},{"uid":"d056ebd5-8e1e-4259-b92a-7e6212dacab3","sectionTitle":"Main Content Section","linkId":"71c514d8-3071-415a-be43-c9a758db23dd"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"507bcd67-a3d2-4796-ac2d-7af61ea43996","linkId":"507bcd67-a3d2-4796-ac2d-7af61ea43996","name":"View","folder":null,"paths":{"ko":"view","default":"view"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"69bcd49a-40ea-43d7-b29b-d1b9f96c0af7","sectionTitle":"Content Section","linkId":"5f51a829-3590-4ea9-995f-b329c6bc9c1d"},{"uid":"4e2b80ae-4649-4c53-9be5-76677bd59622","sectionTitle":"Mobile Overlay","linkId":"089d11ae-b747-425d-b9a1-f4acf2bcfc9d"},{"uid":"b19dc853-e76b-44e8-8dfa-17aa7e17110a","sectionTitle":"Root Container","linkId":"8e838d84-e84a-48b1-bbf2-8c6f5d6da710"}],"pageUserGroups":[],"title":{"ko":"밤오토"},"meta":{"desc":{"ko":"밤오토 현황판입니다"},"keywords":{"ko":"밤오토"},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"82469ccc-5b2d-495b-b653-7f780d876b8c","linkId":"82469ccc-5b2d-495b-b653-7f780d876b8c","name":"Edit","folder":null,"paths":{"ko":"edit","default":"edit"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"e97a6db9-e0fd-458c-a8b0-cefc8e417f4c","sectionTitle":"Content Section","linkId":"e1d44425-26e8-4e86-980d-1c890d6a2b59"},{"uid":"4e2b80ae-4649-4c53-9be5-76677bd59622","sectionTitle":"Mobile Overlay","linkId":"089d11ae-b747-425d-b9a1-f4acf2bcfc9d"},{"uid":"b19dc853-e76b-44e8-8dfa-17aa7e17110a","sectionTitle":"Root Container","linkId":"8e838d84-e84a-48b1-bbf2-8c6f5d6da710"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"b6f5f428-ca6e-4ed2-a8ec-296b35c90200","linkId":"b6f5f428-ca6e-4ed2-a8ec-296b35c90200","name":"Next","folder":null,"paths":{"ko":"next","default":"next"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"b5c3f703-fd8e-4cb4-a9d1-af06ef6035ac","sectionTitle":"Material Snackbar Container","linkId":"e9232906-0469-43fc-b2e5-171a9510442b"},{"uid":"a3469055-532a-416b-bb4c-1fdef5157342","sectionTitle":"Section","linkId":"9373118a-759c-421e-a0f2-0f946e3206b9"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"f0113e52-bf12-42ca-bee4-bfef1dddebbc","linkId":"f0113e52-bf12-42ca-bee4-bfef1dddebbc","name":"Request","folder":null,"paths":{"ko":"request","default":"request"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"5c3542a4-664a-459f-8722-cac0c3094fab","sectionTitle":"Material Snackbar Container","linkId":"cc5977da-4399-4163-8ba6-3ed35335525e"},{"uid":"b84da759-944d-4d11-a1eb-e86288f3e846","sectionTitle":"Content Section","linkId":"6750aa6e-ac01-47e0-a4c7-7fd166c84af1"},{"uid":"4e2b80ae-4649-4c53-9be5-76677bd59622","sectionTitle":"Mobile Overlay","linkId":"089d11ae-b747-425d-b9a1-f4acf2bcfc9d"},{"uid":"b19dc853-e76b-44e8-8dfa-17aa7e17110a","sectionTitle":"Root Container","linkId":"8e838d84-e84a-48b1-bbf2-8c6f5d6da710"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"f9f5b59f-904d-4f83-bd85-adb70847d061","linkId":"f9f5b59f-904d-4f83-bd85-adb70847d061","name":"LogsView","folder":null,"paths":{"ko":"logview","default":"logview"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"de5ffd84-53ce-4a1c-ba50-4bcc28b05634","sectionTitle":"Logs Main Container","linkId":"cf6030ce-a381-4990-b588-2f0881f5347e"},{"uid":"92061386-ab28-470e-a49c-80abd31e1f41","sectionTitle":"Content Section","linkId":"4866bdb7-e6f9-4c35-aeb5-95d8710cabc6"},{"uid":"4e2b80ae-4649-4c53-9be5-76677bd59622","sectionTitle":"Mobile Overlay","linkId":"089d11ae-b747-425d-b9a1-f4acf2bcfc9d"},{"uid":"b19dc853-e76b-44e8-8dfa-17aa7e17110a","sectionTitle":"Root Container","linkId":"8e838d84-e84a-48b1-bbf2-8c6f5d6da710"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"eeed4c33-f731-4402-a573-d2d3d28d9097","linkId":"eeed4c33-f731-4402-a573-d2d3d28d9097","name":"Home","folder":null,"paths":{"ko":"home_","default":"home_"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"af8f1b6e-5e47-4801-8341-5f9e915784c1","sectionTitle":"Content Section","linkId":"e1bfc4a9-aece-44d2-ba2f-d9f7e9f76ca3"},{"uid":"4e2b80ae-4649-4c53-9be5-76677bd59622","sectionTitle":"Mobile Overlay","linkId":"089d11ae-b747-425d-b9a1-f4acf2bcfc9d"},{"uid":"b19dc853-e76b-44e8-8dfa-17aa7e17110a","sectionTitle":"Root Container","linkId":"8e838d84-e84a-48b1-bbf2-8c6f5d6da710"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"c63d6c20-aee6-466d-b96a-384e94a17f20","linkId":"c63d6c20-aee6-466d-b96a-384e94a17f20","name":"Logs","folder":null,"paths":{"ko":"logs","default":"logs"},"langs":["ko"],"cmsDataSetPath":null,"sections":[{"uid":"2ed07493-3073-4000-9bc3-55fe0702916a","sectionTitle":"Logs Main Container","linkId":"4a09cde7-a1ae-4ef2-ad5d-a320d8152105"},{"uid":"3feca737-b17b-4d38-a847-4457f407212a","sectionTitle":"Content Section","linkId":"9fb4ef03-ac2b-43f7-9d40-e36038407309"},{"uid":"4e2b80ae-4649-4c53-9be5-76677bd59622","sectionTitle":"Mobile Overlay","linkId":"089d11ae-b747-425d-b9a1-f4acf2bcfc9d"},{"uid":"b19dc853-e76b-44e8-8dfa-17aa7e17110a","sectionTitle":"Root Container","linkId":"8e838d84-e84a-48b1-bbf2-8c6f5d6da710"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"832d6f7a-42c3-43f1-a3ce-9a678272f811","name":"Date","namespace":"dayjs"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 21;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
