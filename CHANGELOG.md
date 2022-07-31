# Changelog

## [0.0.5](https://github.com/johnshift/veils/compare/v0.0.4...v0.0.5) (2022-07-31)


### :toolbox: Maintenance :toolbox:

* add mantine notifications ([10860f0](https://github.com/johnshift/veils/commit/10860f04dca0ded9d5c66b9be7d377ea7e677386))
* setup auth-core-login lib ([835b718](https://github.com/johnshift/veils/commit/835b7182963cd4334737fc68e9db17c7792f2430))
* setup auth-core-logout lib ([2ea656c](https://github.com/johnshift/veils/commit/2ea656c800e984ea0f75f2bf8d72c5e8955dec5f))
* setup auth-data-login lib ([0d06256](https://github.com/johnshift/veils/commit/0d062560d0cadc783a1c242eeab5842e94d17444))
* setup auth-data-logout lib ([264306f](https://github.com/johnshift/veils/commit/264306fe44026102d0bcd33a627a165c61c8fe42))
* setup auth-data-register lib ([a276d0a](https://github.com/johnshift/veils/commit/a276d0ac4cbca2a4a50ca34176016c6188fee7dc))
* setup auth-register-core lib ([f548152](https://github.com/johnshift/veils/commit/f5481529b02ea146b05fd714781c75546b7163b0))
* setup auth-util-test-login lib ([7b51cf1](https://github.com/johnshift/veils/commit/7b51cf1423d83c726f54f61b4d20d2ad29382729))
* setup auth-util-test-logout lib ([3ed5473](https://github.com/johnshift/veils/commit/3ed54734040ba4a5a8f791ff47945acad87ba3e3))
* setup auth-util-test-register lib ([4bfb218](https://github.com/johnshift/veils/commit/4bfb2184c7f1cd2625fb6f6eb602a7c3857dd2c9))


### :computer: Code Changes :computer:

* **core-login:** add incorrect login error constant ([4924cc5](https://github.com/johnshift/veils/commit/4924cc55654833fe4cd028bbb298dd957fe15f36))
* **core-login:** add login constants ([49fd42c](https://github.com/johnshift/veils/commit/49fd42c033fd6e9aadffc80d071b956b03a7f8ef))
* **core-login:** add login dto ([e4095c1](https://github.com/johnshift/veils/commit/e4095c1fdf58bff7ac56fe7d7f3fa892e858a4b6))
* **core-logout:** add logout constants ([2b099cb](https://github.com/johnshift/veils/commit/2b099cb6a998a018a9d1a2544c7999158ddaf3e3))
* **core-register:** add register constants ([433f3bf](https://github.com/johnshift/veils/commit/433f3bf892fe2067d3c7136669003dcff28ce96f))
* **core-register:** add register dtos ([50cd7ae](https://github.com/johnshift/veils/commit/50cd7ae8a69b9809758c64447f0f5ea69a6d50c2))
* **core-register:** add register field error enum ([14e846c](https://github.com/johnshift/veils/commit/14e846cadd45e28a5da6d53ced3648a80ae9b739))
* **data-login:** add login mutation hook ([b93a903](https://github.com/johnshift/veils/commit/b93a90365c207e7b0bf990409e891611ec64fae6))
* **data-logout:** add logout mutation ([eda678b](https://github.com/johnshift/veils/commit/eda678ba0017ad957a33dbe7c44e761809251806))
* **data-register:** add register mutation fn ([60656ba](https://github.com/johnshift/veils/commit/60656ba40c8a6d58c44071e9ce57e1348f840d31))
* **data-register:** add register mutation hook ([43e2324](https://github.com/johnshift/veils/commit/43e23246d82d28d9f9053c30401419ec6ea4cdbc))
* **util-test-login:** add login payload faker ([e8885fd](https://github.com/johnshift/veils/commit/e8885fdf293f868fa3b9d42abe9f959c5f937ca4))
* **util-test-login:** add mock login response ([a4110fe](https://github.com/johnshift/veils/commit/a4110fec59fab0d88975fc26629ec2c4ed764064))
* **util-test-logout:** add mock logout response ([36e5276](https://github.com/johnshift/veils/commit/36e52765b42323c863eeadd79a62cbf824f06c17))
* **util-test-register:** add mock register response ([37ab853](https://github.com/johnshift/veils/commit/37ab8533c082cb0e30fd83b0f2d81e39ad8ad8cc))
* **util-test-register:** add register payload faker ([948fb49](https://github.com/johnshift/veils/commit/948fb49c827f7f9e4248673fee647815f59b81e9))


### :drop_of_blood: :crossed_swords: Tests :crossed_swords: :drop_of_blood:

* **data-login:** add login mutation unit tests ([4a236bc](https://github.com/johnshift/veils/commit/4a236bc476434139b4df765d713e7978dcc83b07))
* **data-logout:** add logout mutation unit test ([0f211a0](https://github.com/johnshift/veils/commit/0f211a0e6ff1485f73af35a608ad8f22a2e305b5))
* **data-register:** add register mutation hook unit test ([977f0d2](https://github.com/johnshift/veils/commit/977f0d2200c80cde9bba2154f8a3b42f32dc3bc8))

## [0.0.4](https://github.com/johnshift/veils/compare/v0.0.3...v0.0.4) (2022-07-31)


### :toolbox: Maintenance :toolbox:

* add eslint unused-imports deps ([e8fd4dc](https://github.com/johnshift/veils/commit/e8fd4dc92323f55f54f6694da64e1b68dcbc5357))
* add faker deps ([17483e6](https://github.com/johnshift/veils/commit/17483e66a5efae561039208e018c5b643fda68eb))
* add msw, whatwg-fetch deps ([21285f0](https://github.com/johnshift/veils/commit/21285f0894e1d8dbba7ecdc53ba0be2cb91878c9))
* moved mantine, react-query wrappers into shared-util-wrappers lib ([165ac6b](https://github.com/johnshift/veils/commit/165ac6b9e3be5b92280e1b43052687217c72b791))
* removed unused import and variables ([fd51c2d](https://github.com/johnshift/veils/commit/fd51c2d35a5bcd79c4130fc6d53978370554dfc3))
* setup auth-core-session lib ([9a5ed58](https://github.com/johnshift/veils/commit/9a5ed58f2e67548f986b86a88442f2ba05bad522))
* setup auth-data-session lib ([7c064d3](https://github.com/johnshift/veils/commit/7c064d354fe80bfbe17e6c1e67ed05ad996d9d1f))
* setup auth-util-test-session lib ([de98934](https://github.com/johnshift/veils/commit/de98934ec3b8a1a12f57a6b389a85c6fb6a3b661))
* setup shared-core-common lib ([52a0604](https://github.com/johnshift/veils/commit/52a06040d364c447d0e95bc8eef186288362a428))
* setup shared-data-testutils lib ([cd08d8d](https://github.com/johnshift/veils/commit/cd08d8d71a1d68f173fbafbc2d9e313c8f64f460))
* setup shared-util-common lib ([46a8a33](https://github.com/johnshift/veils/commit/46a8a336b50ff93c4466966510e95b6fa39b0217))


### :computer: Code Changes :computer:

* **core-common:** add error internal,network constants ([a66ddba](https://github.com/johnshift/veils/commit/a66ddbaffd55ee9cdf590de4650d0e0cba955aca))
* **core-common:** add generic response dto ([d6058b7](https://github.com/johnshift/veils/commit/d6058b769b0a5958848e94da07af97d040448d50))
* **core-session:** add auth session api url ([16f7edc](https://github.com/johnshift/veils/commit/16f7edcd4d71c8a22290d229cd76a22c53f5228b))
* **core-session:** add empty session object ([7989d2d](https://github.com/johnshift/veils/commit/7989d2dfe2e3fa33563c70721104905086bece82))
* **core-session:** add session type ([e6dbc4e](https://github.com/johnshift/veils/commit/e6dbc4e2b2eb4a0fe07625fe81d406ee4b8be22e))
* **data-session:** add session context ([4d2e013](https://github.com/johnshift/veils/commit/4d2e0136c98acfcad72959779cc3df6188603a2f))
* **data-session:** add session fetch function ([ab1dcc0](https://github.com/johnshift/veils/commit/ab1dcc01c61e482896fa933166eea296d14cd0dc))
* **data-session:** add session provider ([7a5a442](https://github.com/johnshift/veils/commit/7a5a44237bacacbd556938f255f4955f2fb9a8e4))
* **data-session:** add session query ([0b759ab](https://github.com/johnshift/veils/commit/0b759ab5358aaf78d180b572ff586e7064d0d0bf))
* **data-session:** setup test files ([73f15c0](https://github.com/johnshift/veils/commit/73f15c0b6c0ed0578a3fb5adb19bc084ac38971c))
* **data-testutils:** add custom render + util functions ([d933d0c](https://github.com/johnshift/veils/commit/d933d0c81e34fe2c43498d75bdea6678573a1ac2))
* **util-common:** add api fetch utility function ([fb2ae11](https://github.com/johnshift/veils/commit/fb2ae1116c78ace90d760bc754d6bcd841d3460a))
* **util-test-session:** add mock session response ([13cc460](https://github.com/johnshift/veils/commit/13cc460a236eb7a22a6c7908f572775ff262d103))
* **util-test-session:** add session faker ([6dd80e9](https://github.com/johnshift/veils/commit/6dd80e9a1da3de7788bccf9cc89a2c51b4f70ea8))


### :drop_of_blood: :crossed_swords: Tests :crossed_swords: :drop_of_blood:

* **data-session:** add session context unit test ([3aaad6e](https://github.com/johnshift/veils/commit/3aaad6ea0f493e7ddabafe8a882ea797e29f6a56))
* **data-session:** add session provider unit test ([bf9f74e](https://github.com/johnshift/veils/commit/bf9f74efa106e92dfa59626d980af9c42bf0cb7b))
* **data-session:** add session query unit test ([5ce000c](https://github.com/johnshift/veils/commit/5ce000cdd72b67c0819115d534a0eb45da0aac64))
* **util-common:** add api fetch unit tests ([2f4a412](https://github.com/johnshift/veils/commit/2f4a4121df019a15dba3b889e812a10e483846db))

## [0.0.3](https://github.com/johnshift/veils/compare/v0.0.2...v0.0.3) (2022-07-31)


### :toolbox: Maintenance :toolbox:

* add tabler icons deps ([9354d34](https://github.com/johnshift/veils/commit/9354d34b1b76d8b16b033665099caf59e7982f9e))
* add testing-library user-event deps ([d676b9f](https://github.com/johnshift/veils/commit/d676b9fe5f3eb91045ebf75b6e28d79bf1ece65d))
* set filename rule to kebab-case ([169603e](https://github.com/johnshift/veils/commit/169603e36d2ebb9f217ee5238d41e5b511f412be))
* setup shared-ui-testutils lib ([6a32a90](https://github.com/johnshift/veils/commit/6a32a9007c6e99d1b40962f443ab09e09b5eb885))


### :computer: Code Changes :computer:

* **ui-appbar:** add auth modal component ([774734d](https://github.com/johnshift/veils/commit/774734db4c16082f7a70729c26ccf7809ead9dc2))
* **ui-appbar:** add brand component ([6b32fd4](https://github.com/johnshift/veils/commit/6b32fd4d8d9b04e0db1b3b0e118bcab9e86c3f3c))
* **ui-appbar:** add menu component ([a8c6d3c](https://github.com/johnshift/veils/commit/a8c6d3ce4c6c9fc2838d4a80d4ccc2a4867ebfc2))
* **ui-appbar:** add theme toggle component ([8d71db8](https://github.com/johnshift/veils/commit/8d71db832349af0b3d93b8026e40bb529a2839a2))
* **ui-appbar:** implement resize observer for tests ([1746576](https://github.com/johnshift/veils/commit/17465769c03febe676e4ba972f740bca013e957f))
* **ui-appbar:** setup storybook ([6d05f3a](https://github.com/johnshift/veils/commit/6d05f3accdcea3c1c9dd76612d6d31f583b3a521))
* **ui-appbar:** update tsconfig path to support tree shaking ([16234e2](https://github.com/johnshift/veils/commit/16234e2bb3415d7a5b8664ead59f651d7ba74f69))
* **ui-testutils:** add custom render + util functions ([7dc14cb](https://github.com/johnshift/veils/commit/7dc14cbb92829e85989ff671a5f9f21b1faafa5e))
* **util-common:** rearranged folder structure to support tree shaking ([65a8357](https://github.com/johnshift/veils/commit/65a8357fda674f3908fbf5a6ce401b09664e50dc))


### :drop_of_blood: :crossed_swords: Tests :crossed_swords: :drop_of_blood:

* **ui-appbar:** add auth modal story ([c129c2d](https://github.com/johnshift/veils/commit/c129c2d56830357883d287da5dce12f48fdfa084))
* **ui-appbar:** add auth modal unit test ([f616a0e](https://github.com/johnshift/veils/commit/f616a0e41aafa9783b1cccbe4806addec6ec4668))
* **ui-appbar:** add brand story ([0880992](https://github.com/johnshift/veils/commit/088099290e4c994b7d4dc4244edafb8d82b7372a))
* **ui-appbar:** add brand unit test ([d93cb09](https://github.com/johnshift/veils/commit/d93cb09f23287d6626c934f7c20ad7f0e91a2c7e))
* **ui-appbar:** add menu story ([48224c8](https://github.com/johnshift/veils/commit/48224c86669e936546eb5efc7e7c6c8fc1d010b8))
* **ui-appbar:** add menu unit test ([03b955b](https://github.com/johnshift/veils/commit/03b955bc42f01950fb3da17ff4e4e312efff8cbe))
* **ui-appbar:** add theme toggle story ([b0d4d37](https://github.com/johnshift/veils/commit/b0d4d379272a8f4e4f9cdfeb63aaa8601148fdec))
* **ui-appbar:** add theme toggle unit test ([9df96cb](https://github.com/johnshift/veils/commit/9df96cbe2e2d488ff21b7236b5a838bd2717574c))

## [0.0.2](https://github.com/johnshift/veils/compare/v0.0.1...v0.0.2) (2022-07-30)


### :computer: Code Changes :computer:

* **shared-util:** add mantine wrapper util ([2db6b23](https://github.com/johnshift/veils/commit/2db6b23943930d947c06447d091e84a6c5b72a8c))
* **shared-util:** add react-query wrapper ([6f77e4e](https://github.com/johnshift/veils/commit/6f77e4ed763778562f3f8417fac733ba8f7cc32e))


### :shield: Continuous Integration :shield:

* add dev cicd workflow ([5a811aa](https://github.com/johnshift/veils/commit/5a811aaf02b3dce0b05c03d1834c30006dfb9789))
* add on release pr workflow ([9d2cb60](https://github.com/johnshift/veils/commit/9d2cb6082bc8aa91b89d51f7ad01af8963a915b8))
* add on release workflow ([7bef26e](https://github.com/johnshift/veils/commit/7bef26edc50886c8ac824e4641f4e812a7f357e6))


### :toolbox: Maintenance :toolbox:

* add react-query deps ([08482c8](https://github.com/johnshift/veils/commit/08482c827450aefd8f81f38580ed49789f3daf7a))
* add swc lib deps ([6a08d83](https://github.com/johnshift/veils/commit/6a08d8390ae199cd642796ab7d15a4dd1276a27a))
* add swc-jest deps ([c9dd6ec](https://github.com/johnshift/veils/commit/c9dd6ecf84bed8288bdafd0e9387edbde7b46f2c))
* cleanup web app ([fb609c3](https://github.com/johnshift/veils/commit/fb609c3871c5e3c36d8c532aaba13fdfa7d98d68))
* init shared-util-common lib ([bb7be27](https://github.com/johnshift/veils/commit/bb7be27ba475172896a40dbdfd58da7900efae38))
* setup bundlewatch ([f84d3c9](https://github.com/johnshift/veils/commit/f84d3c9d80dcdf9379866a354699c9882b617288))
* setup commitlint + husky ([82d9d3e](https://github.com/johnshift/veils/commit/82d9d3e79e66a6d70f2d6f517547dfb228974fa4))
* setup eslint and prettier ([c0ecce0](https://github.com/johnshift/veils/commit/c0ecce0f8dd1596c1047d080b4d85ce5c38e2813))
* setup mantine ([562afaf](https://github.com/johnshift/veils/commit/562afaf880961e6d0e9db57a8ef770a5357a36e6))
* setup shared-ui-appbar lib ([6a6e6ce](https://github.com/johnshift/veils/commit/6a6e6ce3665b88e9dba3d3c7e3ad315bcf325ece))
* setup storybook ([482f7dc](https://github.com/johnshift/veils/commit/482f7dc736eb87fd73b5f81c1e084c821ae40973))
