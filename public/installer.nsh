# NSIS Modern User Interface
# 关于 Modern 风格界面的命令和宏定义需要参考 NSIS目录下\Docs\Modern UI 2\Readme.html 这个文件的说明。
# 遇到不懂的命令直接查看手册即可获得说明。
# 脚本的段落用 ---- 线进行划分。不同的段落可编写的命令不同，重点注意。
# Written by Shiroha

#--------------------------------
# Includes
# 包含需要用到的头文件，这跟 C 语言是一样的。

  !include "MUI2.nsh"       # 使用 Modern 风格界面，也就是大家最熟悉的那种下一步下一步界面。
  !include "LogicLib.nsh"   # 逻辑操作符头文件。就是 {If} 那些。
  !include "nsProcess.nsh"  # 进程控制插件头文件。用来查找进程和强制结束进程。这个插件可以在 NSIS 官方站点找到下载。

#--------------------------------
# General
# 安装包的基本属性设置。

  # Properly display all languages (Installer will not work on Windows 95, 98 or ME!)
  Unicode true  # 设置为 Unicode 模式，这样界面才可以显示全部的语言。

  # Name and file
  Name "$(STR_ProductName)"   # 设定软件的名字。
  OutFile "vnr_translate_patch_1.4.0.0.exe" # 设定编译输出的文件名。

  # Default installation folder
  InstallDir "" # 设定默认的安装路径。

  # Allow install to root directory
  AllowRootDirInstall true  # 允许用户在安装路径选择界面选择磁盘的根目录。

  # Request application privileges for Windows Vista
  RequestExecutionLevel user  # 设定安装包需要的用户权限，只用于 Vista 以上的版本。设置为 admin 编译出来的 EXE 会带有盾牌小图标。

  # Show the details by default
  ShowInstDetails show  # 默认显示安装细节，安装过程中输出的文字信息。

#--------------------------------
# Compiler Flags
# 编译器选项，影响压缩算法等等。

  SetCompressor lzma  # 使用 LZMA 压缩算法，压缩质量比较好。
  SetDateSave off # 不保存文件日期，安装后文件的日期都是新生成的。

#--------------------------------
# Interface Settings
# 界面选项，修改界面上的一些元素。

  # The icon for the installer
  !define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\nsis3-install-alt.ico"  # 安装包使用的图标文件。MUI_*开头的宏都定义在 MUI2.nsh 文件里，请查看 Modern UI 2 的说明。

  # Sets the text that is shown at the bottom of the install window
  BrandingText "Provided by Shiroha"  # 设置分割线上的文字。

  # Bitmap for the Welcome page and the Finish page
  !define MUI_WELCOMEFINISHPAGE_BITMAP "${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp" # 设置欢迎和完成界面左侧的图片。

  # Display a checkbox the user has to check to agree with the license terms
  !define MUI_LICENSEPAGE_CHECKBOX  # 使用复选框来确认安装协议。
  !define MUI_LICENSEPAGE_CHECKBOX_TEXT "$(STR_LicenseAccept)"  # 复选框的文字。

  # The bitmap with images for the checks of the component select treeview
  !define MUI_COMPONENTSPAGE_CHECKBITMAP "check.bmp"  # 选择安装组件界面的复选框图片，可以自定义的。

  # Do not automatically jump to the finish page, to allow the user to check the install log
  !define MUI_FINISHPAGE_NOAUTOCLOSE  # 安装完成后不要自动跳过过程界面。

  # Show a message box with a warning when the user wants to close the installer
  !define MUI_ABORTWARNING  # 中途退出安装时弹出提示。

  # Text for a link on the which the user can click to view a website or file
  !define MUI_FINISHPAGE_LINK "$(STR_ViewMoreInfo)" # 在完成界面显示一个链接，这个是链接上的文本。

  # Website or file which the user can select to view using the link
  !define MUI_FINISHPAGE_LINK_LOCATION "http://tieba.baidu.com/p/6196474861"  # 链接的实际地址。

  # Show all languages, despite user's codepage
  !define MUI_LANGDLL_ALLLANGUAGES  # 强制显示所有支持的语言。

#--------------------------------
# Installer pages
# 安装包要显示的界面，需要注意的是，界面是按照插入顺序来显示的。

  # Include welcome page
  !define MUI_PAGE_CUSTOMFUNCTION_LEAVE "OnPageWelcomeLeave"  # 这个函数会在点击欢迎界面的下一步按钮时调用。
  !insertmacro MUI_PAGE_WELCOME # 首先插入的是欢迎界面。

  # Create a custom donate page
  Page custom "OnPageDonateCreate"  # 插入一个自定义界面。

  # Include license page
  !insertmacro MUI_PAGE_LICENSE $(STR_License)  # 插入协议确认界面。

  # Include directory selection page
  !define MUI_PAGE_CUSTOMFUNCTION_LEAVE "OnPageDirectoryLeave"  # 这个函数会在点击选择安装路径界面的下一步按钮时调用。
  !insertmacro MUI_PAGE_DIRECTORY # 插入选择安装路径界面。

  # Include install files page
  !insertmacro MUI_PAGE_INSTFILES # 插入安装过程界面。

  # Include finish page
  !insertmacro MUI_PAGE_FINISH  # 插入完成界面。

#--------------------------------
# Languages
# 定义要支持的语言。

  !insertmacro MUI_LANGUAGE "SimpChinese" # 简体中文，会定义 LANG_SIMPCHINESE 变量。
  !insertmacro MUI_LANGUAGE "TradChinese" # 繁体中文，会定义 LANG_TRADCHINESE 变量。

#--------------------------------
# Language strings
# 定义一些字符串的多语言版本。
# 使用多语言字符串时要注意用的是小括号，例如 $() 而不是 ${}

  LangString STR_ProductName ${LANG_SIMPCHINESE} "VNR 翻译修复补丁 1.4"
  LangString STR_ProductName ${LANG_TRADCHINESE} "VNR 翻譯修復補丁 1.4"
  LangString STR_AppIsRunning ${LANG_SIMPCHINESE} "检测到 VNR 正在运行，请将其退出后再试。"
  LangString STR_AppIsRunning ${LANG_TRADCHINESE} "檢測到 VNR 正在運行，請將其退出後再試。"
  LangString STR_DonatePageTitle ${LANG_SIMPCHINESE} "支持作者"
  LangString STR_DonatePageTitle ${LANG_TRADCHINESE} "支持作者"
  LangString STR_DonatePageSubTitle ${LANG_SIMPCHINESE} "喵喵喵～"
  LangString STR_DonatePageSubTitle ${LANG_TRADCHINESE} "喵喵喵～"
  LicenseLangString STR_License ${LANG_SIMPCHINESE} "license.zh-cn.rtf"
  LicenseLangString STR_License ${LANG_TRADCHINESE} "license.zh-tw.rtf"
  LangString STR_LicenseAccept ${LANG_SIMPCHINESE} "我已经备份好这些文件夹(&A)"
  LangString STR_LicenseAccept ${LANG_TRADCHINESE} "我已經備份好這些資料夾(&A)"
  LangString STR_WrongInstallDirectory ${LANG_SIMPCHINESE} "你选择的文件夹不是 VNR 的安装文件夹，请重新选择。"
  LangString STR_WrongInstallDirectory ${LANG_TRADCHINESE} "你選擇的資料夾不是 VNR 的安裝資料夾，請重新選擇。"
  LangString STR_ViewMoreInfo ${LANG_SIMPCHINESE} "浏览贴吧查看更多信息(&M)"
  LangString STR_ViewMoreInfo ${LANG_TRADCHINESE} "瀏覽貼吧查看更多資訊(&M)"

#--------------------------------
# Version Information
# 定义输出的 EXE 文件上的版本信息，也支持多语言显示。

  VIProductVersion "1.4.0.0"
  VIFileVersion "1.4.0.0"
  VIAddVersionKey /LANG=${LANG_SIMPCHINESE} "ProductName" "VNR 翻译修复补丁"
  VIAddVersionKey /LANG=${LANG_TRADCHINESE} "ProductName" "VNR 翻譯修復補丁"
  VIAddVersionKey /LANG=${LANG_SIMPCHINESE} "ProductVersion" "1.4.0.0"
  VIAddVersionKey /LANG=${LANG_TRADCHINESE} "ProductVersion" "1.4.0.0"
  VIAddVersionKey /LANG=${LANG_SIMPCHINESE} "LegalCopyright" "Shiroha"
  VIAddVersionKey /LANG=${LANG_TRADCHINESE} "LegalCopyright" "Shiroha"
  VIAddVersionKey /LANG=${LANG_SIMPCHINESE} "FileDescription" "Application Installer"
  VIAddVersionKey /LANG=${LANG_TRADCHINESE} "FileDescription" "Application Installer"

#--------------------------------
# Reserve Files
# 保留特殊的文件，这些文件会单独压缩，以便安装包启动时快速定位数据并且解压。

  # If you are using solid compression, files that are required before
  # the actual installation should be stored first in the data block,
  # because this will make your installer start faster.

  !insertmacro MUI_RESERVEFILE_LANGDLL  # 保留多语言支持插件的DLL文件。

  # QR code image file
  ReserveFile "donate.bmp"  # 保留一个自定义图片文件。

#--------------------------------
# Installer Sections
# 定义安装过程的组件，安装包至少要有一个组件。如果有多个组件，那就需要定义多个。
# 组件可以定义组件名和执行安装的优先级。
# 安装时会按顺序执行组件中编写的命令。

Section # 本安装包只有一个组件。

  # Sets output directory
  SetOutPath "$INSTDIR" # 设置文件输出路径为安装路径。

  # Files
  File /r "Files\*.*" # 定义要解包的文件。
                      # 这个命令比较特殊，他既定义了要打包的文件，也用于在安装时解包这些文件。
                      # 这里定义的路径是要打包的文件的路径，这里用了通配符来表示 Files 目录下的所有文件，也可以指定单个文件。
                      # 安装时，文件将会解包到 SetOutPath 所设置的路径。
                      # 如果 File 命令定义了多个文件，会按目录结构解包文件，就像平时解压文件一样。

SectionEnd

#--------------------------------
# Installer Functions
# 定义安装包要用到的所有函数。
# 根据 NSIS 脚本的惯例，函数必须写在脚本的最后。

Function ".onInit"  # 以 “.” 开头的函数都是内置的回调函数，会在特定时机自动执行。
                    # 这个函数在安装包启动的时候最先执行。

  # $PLUGINSDIR will automatically be removed when the installer closes
  InitPluginsDir  # 这个命令用于初始化 $PLUGINSDIR 这个变量，一般路径是 “用户临时目录\ns随机字符.tmp\”

  # Show the language selection dialog
  !insertmacro MUI_LANGDLL_DISPLAY  # 显示语言选择对话框。

  # Extract QR code image file
  File "/oname=$PLUGINSDIR\donate.bmp" "donate.bmp" # 把自定义图片解包到临时目录。

FunctionEnd

Function "OnPageWelcomeLeave" # 这个函数会在点击欢迎界面的下一步按钮时调用。
  ${nsProcess::FindProcess} "python.exe" $R0  # 查找名为 “python.exe” 的进程，把结果存到 $R0 寄存器里。
  ${If} $R0 != 0  # 如果没找到，尝试查找另一个。
    ${nsProcess::FindProcess} "pythonw.exe" $R0 # 查找名为 pythonw.exe” 的进程，把结果存到 $R0 寄存器里。
    ${If} $R0 != 0  # 如果也没找到，就可以开始安装了。
      ${nsProcess::Unload}  # 这个插件用完之后要手动卸载掉。
      Return  # 调用返回表示可以进入下一个安装界面。
    ${EndIf}
  ${EndIf}
  ${nsProcess::Unload}  # 这个插件用完之后要手动卸载掉。
  MessageBox MB_ICONEXCLAMATION|MB_OK "$(STR_AppIsRunning)" # 检查到程序正在运行，弹出一个消息框。
  Abort # 调用 Abort 表示不可以进入下一个安装界面。
FunctionEnd

Function "OnPageDonateCreate" # 这个函数会在创建上面定义的界面时调用。
  !insertmacro MUI_HEADER_TEXT "$(STR_DonatePageTitle)" "$(STR_DonatePageSubTitle)" # 设定页面主标题和副标题
  nsDialogs::Create 1018  # 创建界面，参数通常固定是“1018”，除非你打算创建很特殊的界面或者对话框。
  ${NSD_CreateBitmap} 0 0 100% 100% ""  # 创建一个图片框，左边是“0,0”大小是“100%,100%”，图片框的句柄会被压入栈中。
  Pop $R0 # 从栈中弹出图片框的句柄并存入 $R0 寄存器。
  ${NSD_SetImage} $R0 "$PLUGINSDIR\donate.bmp" $R1  # 给图片框设置一个图片，并且会返回一个图片句柄，存入 $R1 寄存器，需要手动释放。
  nsDialogs::Show # 把界面显示出来。
  ${NSD_FreeImage} $R1  # 释放图片句柄。
FunctionEnd

Function "OnPageDirectoryLeave" # 这个函数会在点击选择安装路径界面的下一步按钮时调用。
  ${IfNot} ${FileExists} "$INSTDIR\Visual Novel Reader.exe" # 检查用户选择的安装路径下是否存在“Visual Novel Reader.exe”这个文件。
    MessageBox MB_ICONEXCLAMATION|MB_OK "$(STR_WrongInstallDirectory)"  # 不存在说明路径选择错误，弹出提示框。
    Abort # 调用 Abort 表示不可以进入下一个安装界面。
  ${EndIf}
FunctionEnd

#--------------------------------
# End of script
