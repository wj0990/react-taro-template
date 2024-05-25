const bjxz = "\n\
1.保价服务，将按照实际价值损失比例赔偿(物品损坏可以维修的，在保价金额的限额内赔偿维修费用)，申报上限单票为30000元，请按照货物价值足额申报价值并支付费用，理赔时请提供真实有效价值证明(如发票，合同、付款凭证、三方平台交易记录等)，我们会结合市场价值和第三方机构意见评估损失价值(不包括商业机会、预计收益等间接损失)不足额保价部分或超额保价部分均无法获得赔偿：\n\
1.1足额投保:即声明 (保价)价值等于实际价值的，按货物受损价值赔偿；\n\
1.2不足额投保:即声明 (保价)价值低于实际价值，按货物声明价值和损失比例赔偿，最高赔付不超过保价金额；\n\
1.3超额投保: 即声明 (保价)价值高于实际价值的，按货物受损价值赔偿，最高赔付不超过物品实际价值;\n\
2.保价费用计算规则:\n\
申报价值在1-1000元(含)以下，保价费用为5元、1001-2000元(含)，保价费用为10元、2001-30000元(含)，保价费用=申报价值*0.5%。货物价值在30000元以上建议您自行购买第三方保险。\n\
3.定损原则: 理赔金额=声明 (保价)价值/实际价值*受损价值。\n\
3.1损失部分影响货物整体使用，按整体货物赔付;\n\
3.2损失部分不影响货物整体使用，按损失比例进行赔付;\n\
3.3货物实际损失高于保价金额，最高按保价金额赔付，货物实际损失低于保价金额，最高按货物实际损失赔付。\n\
4.对下列物品不提供保价服务：\n\
4.1邮政、航空等各相关法律法规禁忌品；\n\
4.2中国大陆境内无修复或定损技术的精密货物；\n\
4.3易碎品: 玻璃类、陶瓷类、石膏类、石材类、大型雕刻类以及不易妥善包装的物品;\n\
4.4 3C类中含易碎屏幕 (超过15.6寸)的产品；\n\
4.5无法核实其真实价值的货物或保险期内价值变化较大的货物 (如:二手物品、有价证券、文件、证件、发票、票据或如古玩字画、纪念币、翡翠原石、观赏石等)。\n\
5.如寄件人对托寄物进行虚假陈述、虚假申报、伪造或提供不真实、不准确或不合法文件，或托寄物含有第4条列明的物品，无论托寄物之遗失或损坏是否由智慧快递物流管家直接造成，均不予赔偿；同时，智慧快递物流管家可随时取消保价服务而不需退还任何保价服务费用，期间产生的所有相关费用均由寄件方承担，包括但不限于往返运费、仓储费、保价费、运输费用、入仓费等。\n\
6.如出现第4条所约定的不适用于保价服务的物品与其他可适用于保价服务的物品合并在一个快件或一个运单中托运并已成功购买保价服务的：对于该等不适用保价服务的物品，不予赔偿,但对于其余可适用保价服务的物品，仍应按照约定的赔偿规则承担赔偿责任。\n\
7.保价服务一经购买，本条款及细则即成为《货物运输服务协议》之补充协议，未尽事宜，以《货物运输服务协议》约定为准。\n\
8.贵重物品请选择保价服务，若您的物品未购买保价服务，则每票最高赔付不超过运费的3倍。\n\
";

const wjsm = [
  '  一、遵守国家有关我国禁止和限制邮寄物品的规定',
  '(一)遵守国家邮政局公安部国家安全部关于发布《禁止寄递物品管理规定》的通告，详见《国内邮件禁止寄递的物品》。',
  '(二)遵守海关总署令第43号(中华人民共和国禁止、限制进出境物品表)',
  '中华人民共和国海关总署令',
  '第43号',
  '现发布修订的《中华人民共和国禁止进出境物品表》和《中华人民共和国限制进出境物品表》，自一九九三年三月一日起施行。我署一九八七年十一月一日发布的《中华人民共和国海关总署关于发布禁止、限制进出境物品表的公告》同时废止。',
  '中华人民共和国禁止进出境物品表',
  '1、禁止进境物品',
  '(1)、各种武器、仿真武器、弹药及爆炸物品;(2)、伪造的货币及伪造的有价证券;',
  '(3)、对中国政治、经济、文化、道德有害的印刷品、胶卷、照片、唱片、影片、录音带、录像带、激光视盘、计算机存储介质及其它物品;(4)、各种烈性毒药;',
  '(5)、鸦片、吗啡、海洛英、大麻以及其它能使人成瘾的麻醉品、精神药物;',
  '(6)、带有危险性病菌、害虫及其它有害生物的动物、植物及其产品;',
  '(7)、有碍人畜健康的、来自疫区的以及其它能传播疾病的食品、药品或其它物品。',
  '2、禁止出境物品',
  '(1)、列入禁止进境范围的所有物品;',
  '(2)、内容涉及国家秘密的手稿、印刷品、胶卷、照片、唱片、影片、录音带、录像带、激光视盘、计算机存储介质及其它物品;',
  '(3)、珍贵文物及其它禁止出境的文体;',
  '(4)、濒危的和珍贵的动物、植物(均含标本)及其种子和繁殖材料。',
  '中华人民共和国限制进出境物品表',
  '1、限制进境物品',
  '(1)、无线电收发信机、通信保密机;',
  '(2)、烟、酒;',
  '(3)、濒危的和珍贵的动物、植物(均含标本)及其种子和繁殖材料;',
  '(4)、国家货币;',
  '(5)、海关限制进境的其它物品。',
  '2、限制出境物品',
  '(1)、金银等贵重金属及其制品;',
  '(2)、国家货币;',
  '(3)、外币及其有价证券;',
  '(4)、无线电收发信机、通信保密机;',
  '(5)、贵重中药材;',
  '(6)、一般文物;',
  '(7)、海关限制出境的其它物品。',
  '二、遵守国际邮联关于禁止寄递物品规定',
  '1.有爆炸性、易燃性、腐蚀性、毒性、强酸碱性和放射性的各种危险物品。如雷管、火药、爆竹、汽油、酒精、煤油、桐油、生漆、火柴、农药等。',
  '2.麻醉药物和精神药品。如鸦片、吗啡、可卡因(高根)、恰特草、芬太尼、卡芬太尼等。',
  '3.国家法令禁止流通或寄递的物品。如军火武器、手枪、气枪、手枪配件、本国或外国货币等。',
  '4.容易腐烂的物品。如鲜鱼、鲜肉等。',
  '5.妨碍公共卫生的物品。如尸骨(包括已焚化的骨灰)、未经硝制的兽皮、未经药制的兽骨等。',
  '6.反动报刊书籍、宣传品和淫秽或有伤风化的物品。如带有法论功字样的宣传品、淫秽色情书籍、报刊、杂志等。',
  '7.各种活的动物(但蜜蜂、水蛭、蚕以及医药卫生科学研究机构封装严密并出具证明交寄的寄生虫以及供作药物或用以杀灭害虫的虫类，不在此限)。',
  '三、遵守寄达国(地区)邮政禁止和限制邮寄进口物品的规定',
  '国际邮件寄递还应遵守寄达国(地区)的有关禁止和限制邮寄进口物品的规定。部分寄达国(地区)禁限寄规定如下，仅供参考。',
  '日本 法国 韩国 ',
  '加拿大 美国 澳大利亚 ',
  '泰国 西班牙 英国 ',
  '俄罗斯 越南 ',
  '四、禁止寄递不能通过航空安检的货物类型',
  'A类:易燃品及含有此类危险品的物品(主要的典型有打印墨水、油漆、含酒精成分的香水、松香、蜡烛、硅胶、环氧树脂、胶水、油墨、指甲油、杀虫剂、机油等)。',
  'B类:电池及含有 的典型有手电钻、MP3/MP4、太阳能灯、电动玩具、游戏机、闹钟应急灯、检测仪、激光笔、灭蚊器、苍蝇拍、灯饰、电筒、充电器、对讲机、变压器、遥控器、电子书、开瓶器、展示座、电子秤、脱毛器、心率表、收银机、手提电脑、照相机等)。',
  'C类:磁性物质及含磁性组件的物品(主要的典型有音箱、喇叭、扩音器、汽车起动器、磁锁、开锁器、电机、仪表、变压器、传感器等)。',
  'D类:不明液体、气体、粉末及含此类不明物的物品(主要的典型有蜡烛香熏、充电吸液器、灯具、陶瓷泥、水嘴、玩具样品、走马灯、铁罐样品、咖啡机、沙粒样品、充气清新剂、沐浴液、塑料盒样品、压缩气容器等)。 E类:压缩机及含压缩机组件的物品(主要的典型有压缩机、空调机、除湿机、制冷设备等)。',
  'F类:其它物品(主要的典型有仿真玩具枪、显示器、电视机、玻璃、水银温度计、线路板、铁钩样品、刀具样品',
  '等)。',
  '及交寄其它属于国际航空货运协会(IATA)、国际民用航空组织(ICAO)所禁止寄递物。',
];

const kdfwxy =[
'发布日期：2023年08月01日 ',
'生效日期：2023年08月01日 ',
'欢迎使用智慧快递物流管理产品及服务！',
'您的信任对我们非常重要，我们深知个人信息对您的重要性，景德镇市牧寰科技有限公司(以下简称“我们”）将按法律法规要求并参照行业实践及标准为您的个人信息安全提供充分保障。为此，我们制定本《用户隐私政策》以帮助您充分了解，在您使用智慧快递物流管理产品/服务的过程中，我们会如何收集、使用、对外提供、委托处理、存储和保护您的个人信息以及您可以如何管理您的个人信息。',
'在您开始使用智慧快递物流管理APP产品和服务（以下简称“智慧快递物流管理”）前，请您务必先仔细阅读和理解本政策，特别应重点阅读我们以标识的条款，确保您充分理解和同意后再开始使用。如对本政策内容有任何疑问、意见或建议，您可通过本政策提供的联系方式与我们联系。',
'本政策将帮助您了解以下内容：',
'一、适用范围',
'二、我们如何收集和使用您的个人信息',
'三、我们如何使用Cookie和同类技术',
'四、我们如何对外提供、转移、公开披露您的个人信息',
'五、我们如何保护和保存您的个人信息',
'六、您的权利',
'七、您的个人信息如何在全球范围转移',
'八、第三方SDK功能说明',
'九、我们如何处理儿童的信息',
'十、本政策如何更新及争议解决',
'十一、如何联系我们',
'一、适用范围',
'本政策适用于您所使用的智慧快递物流管理服务，具体有：智慧快递物流管理APP。智慧快递物流管理可能适配多种智能终端，包括电脑、智能手机、巴枪以及其他IoT设备。',
'需要特别说明的是，本政策不适用于其他第三方通过前述网页或移动端直接向您提供的服务（统称“第三方服务”），如您开通使用第三方应用服务的，均由第三方服务提供者向您提供服务。您向该第三方服务提供者提供的信息不适用于本政策，您在选择使用第三服务前应充分了解第三方服务的产品功能及隐私保护政策，再选择是否开通功能。',
'二、我们如何收集和使用您的个人信息',
'我们的业务包括了基本业务功能和扩展业务功能，我们仅会出于下述目的，收集和使用您的个人信息：',
'（一）为实现基本业务功能，收集和使用您个人信息的情形',
'我们可能会收集、保存和使用下列与您有关的信息才能实现下述基本功能。如果您不提供相关信息，您将无法享受相关的智慧快递物流管理服务。这些功能包括：',
'1.注册账号',
'（1）为完成创建账号，您需提供以下信息（统称“账户信息”）：您的手机号、账号名称/昵称、账号密码，我们将通过发送短信验证码来验证您的身份是否有效。若您不同意我们收集前述信息，将无法完成账号创建，无法使用智慧快递物流管理APP产品和服务。',
'（2）为完成智慧快递物流管理服务点的创建，您需要提供以下信息（统称“服务点信息”）：服务点名称、服务点联系电话、服务点的详细地址信息。若您不同意我们收集前述信息，将无法为您完成服务点的创建，将影响您业务的正常运行。',
'2.为您提供物流服',
'在您下单寄件或您的信息作为收件人被提供时，智慧快递物流管理收集您的以下信息：寄件人及收件人的姓名、地址、联系方式和货件信息（统称“运单信息”），用于提交订单、生成物流运单、收件、分拣、以及派送货件；根据相关法律要求，我们还收集您的身份证件信息用于核验您的身份。若您不同意我们收集前述信息，将无法使用物流服务，也无法完成对您身份的核验。',
'如果您提供了不准确或错误的地址，在不违反相关法律法规对个人信息存储的强制要求的前提下，我们可能会使用您过往的运单信息对不准确、错误的地址信息进行补全、纠正，以节省与收/寄件人反复确认地址的时间，保证时效，避免您因快件错误派送、延迟派送而遭受损失，让您有更好的服务体验。',
'3.版本管理及更新',
'在您使用智慧快递物流管理服务/产品过程中，我们需要收集您的MAC、Android ID、UUID信息。若您不同意我们收集前述信息，将无法及时进行版本更新，影响您的使用。',
'4.客服与售后',
'我们的客服和售后功能会使用您的账号信息和运单信息。',
'为保证您的账号安全，我们的在线客服会使用您的账号信息、运单信息核验您的身份。当您需要我们提供与您的寄件相关的客服与售后服务时，我们将会查询您的运单信息、货件路由信息。您有可能在与我们的客服人员沟通时，提供上述信息外的其他信息，如当您要求我们变更派送地址、联系人或联系电话。',
'5.保障交易安全',
'为提高您使用我们的服务时系统的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更准确地预防钓鱼网站欺诈和保护账户安全，我们可能会通过了解您的浏览信息、运单信息、您常用的软件信息、设备信息来判断您的账号风险，并可能会记录一些我们认为有风险的链接（“URL”）；我们也会收集您的设备信息（IMEI、MEID、IMSI设备标识符）、应用信息（app版本、应用崩溃信息、通知开关状态、软件列表相关信息）、设备参数及系统信息（设备类型、设备型号、操作系统及硬件相关信息）和微信ID（针对从微信端使用智慧快递物流管理服务的用户）对于智慧快递物流管理系统问题进行分析、统计流量并排查可能存在的风险、在您选择向我们发送异常信息时予以排查。若您不同意我们收集前述信息，我们将无法保证您的交易安全。',
'7.人脸识别',
'为保证服务点的合法合规性，我们会在获得您的同意后，收集您的实名信息：身份证照片、真实姓名和身份证号码。实名认证的相关信息需要您本人主动上传。若您不同意我们收集前述信息，我们将无法对您的身份进行核实，影响您使用智慧快递物流管理APP产品和服务。',
'同时，您应知晓：因上述信息的收集、保存和使用是实现基本业务功能的必要前提，如您不同意上述信息的收集，您将无法完成账号的注册登录，接受物流服务、支付结算、消息推送、客服与售后，也无法完成对您的实名验证，保证您的交易安全。',
'（二）扩展业务功能收集和使用您个人信息的情形',
'为使您更便捷地使用智慧快递物流管理的服务，我们的以下扩展业务功能可能会收集和使用您的个人信息。如果您不提供这些信息，您依然可以使用智慧快递物流管理的核心业务功能，但您可能无法使用这些可以为您带来便捷的扩展业务功能或者需要重复填写一些信息。这些扩展业务功能包括：',
'1. 麦克风语音输入',
'您可以直接使用麦克风来进行语音输入运单信息或手机号信息。在这些功能中我们会识别您的录音内容以满足您的输入需求。',
'2. 地图功能',
'您可使用该功能查询智慧快递物流管理服务点的位置信息。如您使用该功能，我们需要收集您的地理位置信息。',
'3. 基于摄像头（相机）的附加功能',
'您可以使用此功能完成图片上传。条码识别等OCR功能，以及实名认证拍照功能。',
'4. 基于通讯录信息的附加功能',
'您可以选择调用您的通讯录信息以方便获取您的电联状态以供后期查询。',
'5. 基于蓝牙权限的附加功能',
'您可以通过蓝牙连接打印机设备，用于打印快递面单、取件码内容。',
'6. 消息推送',
'我们收集您的设备信息，包括：设备信息（IMEI、MEID、IMSI设备标识符）、系统版本、app版本，用于向您推送快件路由信息、支付状态信息及优惠券、促销信息。若您不同意我们收集前述信息，您将无法接收快件路由、支付状态及优惠信息。如您不想接收消息推送，您也可以在手机或其他设备的“设置”进行免打扰设置。',
'7.基于电话权限的附加功能',
'您可以使用网络电话功能，用于与快递收件人取得联系。如您使用该功能，我们需要收集您的IMEI、IMSI信息。',
'上述附加功能可能需要您在您的设备中向我们开启您的地理位置（位置信息）、相机（摄像头）、相册（图片库）、麦克风、通讯录、电话以及蓝牙的访问权限，以实现这些功能所涉及的信息的收集和使用。您可以在手机等移动设备的“设置”中逐项查看上述权限的开启状态，并可以决定将这些权限随时开启或关闭。您开启这些权限即代表您授权我们可以收集和使用这些个人信息来实现上述功能；如您关闭权限，我们将不再继续收集和使用您的这些个人信息，也无法为您提供上述与这些授权所对应的功能。您关闭权限不会影响此前基于您的授权所进行的个人信息的处理。',
'8．设备权限调用汇总',
'智慧快递物流管理在提供服务过程中，会调用您的主要设备权限汇总如下。您可以在设备的设置功能中选择关闭部分或全部权限。在不同设备中，权限显示方式及关闭方式可能有所不同，具体请参考设备及系统开发方说明或指引：',
'（三）间接获取、使用个人信息的情形',
'我们可能从第三方获取您授权共享的账户信息（头像、昵称），并在您同意本政策后将您的第三方账户与您的智慧快递物流管理账户绑定，使您可以通过第三方账户直接登录并使用智慧快递物流管理的服务。',
'如您通过非智慧快递物流管理页面的第三方渠道下单寄件（如电商平台），智慧快递物流管理将从这些第三方渠道获取您的运单信息，包括收寄件人姓名、电话、地址和货件信息，以便为您提供收寄件相关服务。',
'在您向他人寄件时，请确保已获得收件人的相关授权，确保我们有权依据本政策处理收件人的个人信息。',
'如我们从我们的合作伙伴获取您的个人信息，我们将依据与第三方的约定、对个人信息来源的合法性进行确认后，在符合相关法律和法规规定的前提下，使用您的这些个人信息。',
'（四）其他用途',
'当我们要将您的个人信息用于本政策未载明的其它用途时，或基于特定目的收集而来的信息用于其他目的时，会通过在线点击授权或邮件、短信形式事先征求您的明确同意。',
'（五）征得同意的例外',
'您充分知悉，在以下情形中，我们收集、使用个人信息无须征得您的授权同意：',
'1.与国家安全、国防安全有关的；',
'2.与公共安全、公共卫生、重大公共利益有关的；',
'3.与犯罪侦查、起诉、审判和判决执行等有关的；',
'4.出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；',
'5.所收集的个人信息是个人信息主体自行向社会公众公开的；',
'6.从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；',
'7.根据您的要求签订和履行合同所必需的；',
'8.用于维护所提供的服务的安全稳定运行所必需的，例如发现、处置服务的故障；',
'9.为合法的新闻报道所必需的；',
'10.法律法规规定的其他情形。',
'三、我们如何使用Cookie和同类技术',
'当您使用智慧快递物流管理提供产品或服务时，我们使用COOKIES和其他类似技术来记录信息，您的设备信息及与我们的服务相关的日志信息。此等技术帮助我们更好地了解用户的行为，告诉我们您浏览了我们网站的哪些部分，以及您正在处理的交易，并衡量广告和网络搜索的效果并加以改善。',
'请您理解，我们平台中的许多COOKIES起着至关重要的作用：例如，当您登录我们账号时，COOKIES记录着您的账号信息，使您省去重复输入注册信息等步骤，或帮助您判断您的账户安全。其它的COOKIES帮助我们了解您使用我们平台的方式，从而使我们改进线上工作。对此我们使用相关的分析工具分析我们平台的加载时间、访客使用的方式，以及我们平台的访客查看最多的信息。它们还帮助我们发现我们平台中没有达到预期效果的部分，促使我们采取修复措施，为您打造更好用的平台。',
'您可以选择接受或拒绝所有COOKIES，或拒绝具体类别的COOKIES。如果您关闭COOKIES后，您仍可以使用我们平台的部分内容，但有些有用部分将不能使用，并且，将可能导致我们无法全部或部分提供产品或服务，或影响您获取产品或服务的等级、数量和类型。同时我们承诺，不会将Cookie用于本隐私政策之外的任何其他用途。',
'四、我们如何对外提供、转移、公开披露您的个人信息',
'（一）对外提供',
'1.向授权合作伙伴提供：',
'仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会向合作伙伴提供您的某些个人信息，以提供更好的客户服务和用户体验。我们只会提供服务所必要的个人信息，我们的合作伙伴无权将接收的个人信息用于任何其他用途，除非另行获得您的单独同意。',
'目前，我们的授权合作伙伴包括以下类型：',
'供应商、服务提供商和其他合作伙伴。我们将信息发送给在全球范围内支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供技术基础设施服务、分析我们服务的使用方式或潜在风险、运输、仓储、清关、末端收派、支付便利、提供客户服务、提供数据存储或数据分析服务、提供第三方附加业务功能服务（如语音输入、地图功能）或进行学术研究和调查。',
'2.向我们的关联公司提供',
'您的个人信息可能会向极兔的关联公司提供。我们只会提供必要的最小化个人信息，且受本政策中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。',
'我们承诺对您的信息进行严格保密，仅会出于合法、正当、必要、特定、明确的目的共享您的用户信息，并且只会共享提供服务所必要的用户信息，除法律法规及监管部门另有规定外。在共享您的个人信息前，我们会进行个人信息安全影响评估。',
'同时我们会与上述供应商、服务提供商和其他合作伙伴的个人信息安全防护能力水平提出要求，签署严格的承诺书/保密协议/数据处理协议，要求他们按照我们的说明、本政策以及其他任何相关的保密和安全措施来处理个人信息。一旦发现违反协议约定将会采取有效措施甚至终止合作。',
'我们对外提供个人信息的接收方具体情况见下表：',
'我们可能会基于业务需要更换部分合作方，如您在使用过程中希望确认数据接收方的最新情形、对我们使用的第三方服务和供应商有任何疑问或需要向数据接收方进行沟通或提出与个人信息相关的请求，您可通过本政策中提供的联系方式与我们取得联系，我们会及时解答您的疑惑、响应您的请求。',
'（二）转移',
'我们不会将您的个人信息转移给任何公司、组织和个人，但以下情况除外：',
'1.在符合相关法律法规及网信部门规定的条件下，根据您的指示，按照我们提供的转移途径将您的个人信息转移至您指定的接收方；',
'2.如因我们的有关业务/资产转让、重组、处置（包括资产证券化）、合并、分立、收购或解散、被宣告破产等原因需要转移您的个人信息的，我们将向您告知接收方的名称或者姓名和联系方式，我们会要求该接收方继续接受本隐私权政策规定的约束，否则我们将要求该接收方重新向您获得同意。',
'（三）公开披露',
'我们仅会在以下情况下，公开披露您的个人信息：',
'1.获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；',
'2.如果我们确定您出现违反法律法规或严重违反智慧快递物流管理相关协议规则的情况，或为保护智慧快递物流管理用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或智慧快递物流管理相关协议规则征得您同意的情况下披露关于您的个人信息，包括相关违规行为以及智慧快递物流管理已对您采取的措施。',
'3.基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。',
'五、我们如何保护和保存您的个人信息',
'（一）我们如何保护您的个人信息安全',
'1.我们设立了数据安全管理职能，采取个人信息在物理（门禁隔离、监控系统）、管理（制定信息安全体系制度、将数据分类分级、与员工签订保密协议、开展数据安全和隐私保护培训、定期开展合规自评估）和技术（通过https安全浏览方式确保传输加密、采用加密技术确保数据存储加密、敏感信息内容展示脱敏、匿名化处理、系统访问部署了双因素认证访问控制机制、自动化代码检查、日志审计）等方面的安全保障措施努力保护您的个人信息不被未经授权地访问、使用、披露、修改、损坏或丢失及其它的形式的非法处理。',
'2.我们会定期组织安全应急预案演练，防止安全事件发生。若不幸发生智慧快递物流管理知悉所获取并储存的数据安全受到危害时，或由于外部行为（例如黑客攻击）使用户的非公开信息被披露给不相关第三方时，尽管本政策中有其他免责规定，智慧快递物流管理也会启动应急预案，组成紧急应急小组，启动流程，进行内部调查、上报并通知监管部门、以及配合监管部门工作，降低事故对用户的影响，同时会在认为适当的情况下采取推送通知、邮件、公告等形式告知相关用户，告知其被披露的信息以及智慧快递物流管理对该等情况的知悉程度。',
'（二）个人信息的保存期限',
'1. 我们仅会在为达成本指引所述目的所需最短期限内保留个人信息，除非法律有强制的存留要求。',
'2. 如果我们终止服务或运营，我们会至少提前三十日向您通知，并在终止服务或运营后对您的个人信息进行删除或匿名化处理；超出必要期限后，我们也将对您的个人信息进行删除或匿名化处理，但法律法规另有规定的除外。',
'六、您的权利',
'按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：',
'（一）访问您的个人信息',
'您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：',
'如您需要访问您在使用我们的产品或服务过程中产生的其他个人信息，您可以与我们联系，我们会根据本政策所列明的方式和期限响应您的请求。',
'（二）更正或补充您的个人信息',
'当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正或补充。',
'账户信息——如果您希望访问或编辑您的账户中的个人资料信息，您可以使用您在智慧快递物流管理的账号和密码登录您所注册的智慧快递物流管理APP、微信公众号，点击“我的”-“头像”修改您注册时向智慧快递物流管理提供的个人信息，包括用户名、微信号、手机号、密码。',
'寄件、收件信息—您可以使用您在智慧快递物流管理的账号和密码登录您所注册的智慧快递物流管理APP、微信公众号，点击“首页”-“寄件”修改、删除您的寄件地址及常用收件地址（部分渠道不支持该功能）。',
'如您需要更正或补充您在使用我们的产品或服务过程中产生的其他个人信息，您也可以与我们的客服联系。',
'（三）删除您的个人信息',
'1.在以下情形中，您可以通过“我的”-“反馈与投诉”向我们提出删除个人信息的请求，我们将本政策所列明的方式和期限处理您的请求。',
'（1）如果我们处理个人信息的行为违反法律法规；',
'（2）如果我们收集、使用您的个人信息，却未征得您的明确同意；',
'（3）如果我们处理个人信息的行为违反了与您的约定；',
'（4）如果您不再使用我们的产品与/或服务，或您注销了账号；',
'（5）如果我们不再为您提供产品或服务。',
'2.当您或我们协助您从我们的服务中删除信息后，因为适用的法律和安全技术，我们可能无法立即备份系统中删除相应的信息，我们将安全地存储您的个人信息并将其与任何进一步处理隔离，直到备份可以清除或实现匿名。',
'3.若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，并要求其及时删除（除非法律法规另有规定，或这些主体已独立获得您的授权）。',
'（四）获取个人信息副本',
'如您需要您的个人信息副本，您可以通过“我的”-“反馈与投诉”向我们提出提出相应请求，在通过必要的验证措施后，我们将在法律法规允许的情况下，本政策所列明的方式和期限处理您的请求并将您的个人信息发送您至指定的邮箱。',
'（五）改变您授权同意的范围',
'每个业务功能需要一些基本的个人信息才能得以完成（见本政策第二部分）。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。',
'您可以通过关闭系统权限的方式来撤回您原来的授权，但请您注意，此项撤回不影响我们之前通过您的授权所收集的个人信息，同时，因您的某些授权是实现我们某些业务功能的必要权限，您撤回相应授权的可能会影响您使用我们对应的部分业务功能。',
'1.麦克风权限：您可以撤回手机系统中的“麦克风”权限，届时，您将无法使用手机麦克风进行语音输入单号。',
'2.通讯录权限：您可以撤回手机系统中的“通讯录”权限，届时，我们将无法获取您的通讯状态。',
'3.位置权限：您可以撤回手机系统中的“位置”权限，届时，我们将无法获取您的地理位置信息。',
'4.相机权限：您可以撤回手机系统中的“相机”权限，届时，您将无法使用的您的摄像头拍摄。',
'5.您可以撤回手机系统中的“读取、写入外部存储”（安卓系统），届时，您将无法读取、写入外部存储文件。',
'6.您可以撤回手机系统中的“通知权限”，届时，您将无法接收我们对您的消息推送。',
'您可以通过“我的”-“反馈与投诉”向我们提出提出相应请求，在通过必要的验证措施后，我们将本政策所列明的方式和期限处理您的请求。您也可以通过注销账户的方式，撤回我们继续收集您个人信息的全部授权。',
'当您收回同意后，我们将不再处理相应的个人信息。但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。',
'（六）个人信息主体注销账户',
'智慧快递物流管理用户可通过“我的”-“设置”-“账号注销”提交账户注销申请；也可通过App专门的反馈渠道进行反馈，我们将在收到您的注销请求后15个工作日内完成注销。',
'（七）响应您的上述请求',
'1.为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。',
'2.您的请求我们将在十五个工作日内做出答复。如您对我们的答复不满意，还可以通过本政策所述的联系方式向我们投诉。',
'3.对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。',
'4.在以下情形中，按照法律法规要求，我们将无法响应您的请求：',
'（1）与个人信息处理者履行法律法规规定的义务相关的；',
'（2）与国家安全、国防安全直接相关的；',
'（3）与公共安全、公共卫生、重大公共利益直接相关的；',
'（4）与刑事侦查、起诉、审判和执行判决等直接相关的；',
'（5）个人信息处理者有充分证据表明个人信息主体存在主观恶意或滥用权利的；',
'（6）出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；',
'（7）响应您的请求将导致个人信息主体或其他个人、组织的合法权益受到严重损害的；',
'（8）涉及商业秘密的。',
'七、您的个人信息如何在全球范围转移',
'除非获得您的特别同意，或者满足法律规定的评估及许可程序，我们不会跨境转移您的个人信息。',
'八、第三方SDK功能说明',
'合作的第三方SDK服务商:当您使用智慧快递物流管理APP中由第三方提供的功能时，我们可能会接入由第三方提供的软件开发包( SDK )以实现相关功能。此时，第三方SDK服务商可能会收集您相关的个人信息。前述服务商收集和处理信息等行为遵守其自身的隐私条款，而不适用于本政策。为了最大程度保障您的信息安全，我们建议您在使用任何第三方SDK类服务前先行查看其隐私条款。为保障您的合法权益，如您发现这等SDK或其他类似的应用程序存在风险时，建议您立即终止相关操作并及时与我们取得联系。',
'（一）第三方账号登录功能：为给您提供第三方账号登录的功能，第三方服务商可能会获取您的必要设备信息、网络相关信息、地理位置信息;',
'（二）地理位置服务：注册服务点时，为您提供精确的定位信息。以便验证服务点的有效性并通知收件人智慧快递物流管理件。第三方服务商可能会获取您的详细地址信息和经纬度信息。',
'（三）消息推送服务：为给您提供消息推送，第三方推送服务商可能会获取您的推送SDK版本号、必要设备信息、手机状态信息、地理位置信息、网络相关信息以便推送系统相关通知；',
'具体请查阅：《第三方SDK收集信息说明》',
'九、我们如何处理儿童的个人信息',
'（一）我们非常重视对儿童个人信息的保护。若您是14周岁以下的儿童，在使用我们的产品或服务前，应事先请您的监护人阅读本政策并征得您监护人的同意。',
'（二）我们不会主动直接向儿童收集个人信息。对于经监护人同意而收集儿童个人信息的情况，我们只会在受到法律允许、监护人同意或者保护儿童所必要的情况下使用、共享、转让或披露此信息。',
'（三）如有事实证明儿童并未取得监护人同意的情况下注册使用了我们的产品或服务，我们会与监护人协商，并设法尽快删除相关个人信息。',
'（四）对于可能涉及的不满14周岁的儿童个人信息，我们进一步采取以下措施予以保障：',
'1.对于收集到的儿童个人信息，我们除遵守本隐私政策关于用户个人信息的约定外，还会秉持正当必要、知情同意、目的明确、安全保障、依法利用的原则，严格遵循《儿童个人信息网络保护规定》等法律法规的要求进行存储、使用、披露，且不会超过实现收集、使用目的所必须的期限，到期后我们会对儿童个人信息进行删除或匿名化处理。',
'2.当您作为监护人为被监护的儿童选择使用智慧快递物流管理产品或服务时，我们可能需要向您收集被监护的儿童个人信息，用于向您履行相关服务之必要。在具体服务中需要向您收集儿童个人信息的，我们会事先取得您的授权同意，并告知您收集的目的和用途。如果您不提供前述信息，您将无法享受我们提供的相关服务。若儿童本人需要注册或使用我们的产品与/或服务，您应正确引导并予以监护。',
'3.儿童或其监护人有权随时访问和更正儿童个人信息，还可以向我们提出更正和删除的请求。如您对儿童个人信息相关事宜有任何意见、建议或投诉、举报，请联系我们。我们会随时为您提供帮助。',
'十、本政策如何更新及争议解决',
'（一）未经您明确同意，我们不会削减您按照本政策所应享有的权利。我们会在本页面上发布对本政策所做的任何变更。',
'（二）对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过弹窗发送通知，说明隐私政策的具体变更内容）。',
'（三）本政策所指的重大变更包括但不限于：',
'1.我们的服务模式发生重大变化。如处理个人信息的目的、处理个人信息的类型以及个人信息的使用方式等；',
'2.我们在控制权、组织架构等方面发生重大变化。如并购重组等引起的控制者变更等；',
'3.您参与个人信息处理方面的权利及其行使方式发生重大变化；',
'4.我们负责处理用户信息安全的责任部门、联络方式及投诉渠道发生变化时；',
'5.用户信息安全影响评估报告表明存在高风险时。',
'（四）本政策的执行、解释及争议的解决均适用中华人民共和国法律，且不考虑任何冲突法。',
'（五）您和我们就本政策内容或其执行发生任何争议的，双方应友好协商解决；如双方无法协商解决争议时，您可以向公安、监管部门（网信办等）或权威部门投诉、举报，或者依据适用的法律向具有管辖权的法院提起诉讼。',
'十一、如何联系我们',
'（一）我们设置了专门的信息安全部门保护您的个人信息，如有相关问题可通过下列方式反馈或投诉举报。我们将在十五个工作日向您反馈。',
'1.通过热线电话15677170939与我们联系，客服会将相关事项转交给个人信息保护责任部门处理。',
'2.数据安全负责人：邹先生   隐私保护邮箱：jdziims@163.com',
'（二）我们的信息',
'公司名称：景德镇市牧寰科技有限公司',
'注册地址：江西省景德镇市昌江区高新区兴园路43号',
'第三方 SDK处理个人信息声明',
'为保障中通快递的产品与/或服务的相关功能的实现，以及产品与/或服务安全稳定的运行，我们可能会接入由第三方提供的软件开发包（SDK）实现相关目的。我们会对合作方获取信息的软件工具开发包（SDK）进行严格的安全评估，以保护您的个人信息安全。以下是我们接入的第三方SDK类服务商以及处理个人信息的相关情况：',
'1、极光推送SDK',
'当向您通知最新的运单状态时，我们为了实现消息推送功能，我们集成【极光推送SDK】，该服务由第三方合作伙伴【极光】提供。在提供该等服务的过程中，第三方合作伙伴需要收集您的相关个人信息，包括设备信息（包括设备标识符IMEI、IDFA、Android ID、MAC、OAID、IMSI等相关信息）、应用信息（应用崩溃信息、通知开关状态、软件列表等相关信息）、设备参数及系统信息（设备类型、设备型号、操作系统及硬件相关信息）、网络信息（包括IP地址、WiFi信息、基站信息等相关信息）、地理位置信息。',
'为向您提供更好的服务、改善技术和提升用户体验，您理解并同意，我们有权在必要范围内向第三方合作伙伴提供您的个人信息，且第三方合作伙伴亦可以基于前述目的自行收集和使用您的个人信息，并在保护您个人信息和隐私权以及符合适用法律法规的前提下，将收集的信息和数据经去标识化或匿名化处理后用于其他服务和用途。当我们要将个人信息用于本政策未载明的其他用途时，会事先通知您并征求您的同意。当我们要将基于特定目的收集而来的信息用于其他目的时，也会事先通知您并征求您的同意。',
'[个人信息保护政策链接：](https://docs.jiguang.cn//compliance_guide/app_compliance_guide/app_compliance_guide1/)',
'2、高德地图SDK',
'当您查看订单详情，编辑寄件/收件地址，使用网点查询功能时，需要获取您的地理位置信息，设备信息，网络信息，包含设备型号、MAC地址、IMEI、IMSI、系统版本、手机型号，WLAN状态，在地图上显示当前快件状态，附近网点地址，路径规划，附近的地址以及跳转高德地图App进行导航规划。[隐私权政策链接：](https://lbs.amap.com/pages/privacy/)',
]


const fhxz = [
  "尊敬的客户:",
  "【智慧快递物流管家】秉持为您提供价格实惠、安全快捷、诚信圆满的高品质全程可视化的门到门快递服务，在您寄递货物之前，请务必详细了解以下注意事项:",
  "1.寄件标准:",
  "我们禁止收运的物品:包括但不限于涉及动物及其部分、货币、不记名票据、可流转票据、伪冒货品、贵重金属和宝石、枪械及其组件、弹药、人体残肢、色情物品，非法毒品/药物，航空违禁品以及不合格装包的物品。",
  "我们可接收单件货物的包装：三边（长+宽+高）之和不超过300CM，单边不超过150CM，货物净重不能超过50KG。",
  "快件的计费：体积重量(KG)=长(CM)*宽(CM)*高(CM)/6000, 取体积重量与实际重量中的两者之间较大值定义为计费重量。",
  "2.物品申报：",
  "寄件人应如实申报填写所委托的快件物品名称，如因虚报、瞒报、谎报所造成的货物延误、海关扣货等须自行承担一切后果。",
  "3.快件查询:",
  "查询货物运输状态，可在【智慧快递物流管家】小程序>查件>输入运单号进行查询。",
  "4.货物保险：",
  "寄件人在委托寄件时可自行选择为货物购买货物保险。",
  "5.遗失受理:",
  "如果货物运送失败，您可以联系【智慧快递物流管家】客服，提供货物及其包装的准确描述后由客服人员协助处理。",
  "6.业务咨询:",
  "如果您对所托寄的物品是否能收寄、包装注意事项、以及其他不清楚事项，请联系【智慧快递物流管家】专业客服人员为您提供咨询服务。",
]

export { bjxz, wjsm, kdfwxy, fhxz };
