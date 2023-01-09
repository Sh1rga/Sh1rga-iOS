var settingLangJson = "";
var language = "en";
function settinglangset() {
if (language == "ar") {
	document.getElementById('bdo').dir = "rtl";
	settingLangJson = {
	"back" : "خلف",
	"changeicon" : "تغيير الايقونة",
	"notification" : "إشعار",
	"notification_1" : "تلقي إشعار عند استلام رسائل جديدة.",
	"disableautosleep" : "تعطيل السكون التلقائي",
	"disableautosleep_1" : "تعطيل النوم التلقائي أثناء المحادثة.",
	"protocol" : "بروتوكول الاتصالات",
	"reqrestart" : "مطلوب إعادة التشغيل.",
	"customserver" : "خادم مخصص",
	"customserver_1" : "تأكد من إعداد الخوادم الموثوقة فقط.",
	"background" : "تمكين الخلفية",
	"background_1" : "إذا سمحت دائمًا بالوصول إلى معلومات الموقع ، يمكنك تلقي الإشعارات بنجاح حتى في الخلفية.",
	"background_2" : "ومع ذلك ، قد يستهلك المزيد من طاقة البطارية.",
	"muteword" : "كتم كلمة",
	"muteword_1" : "يكتم الكلمات المحددة.",
	"report" : "تقرير للمطور",
	"setting" : "الإعدادات"
	}
}else{
	document.getElementById('bdo').dir = "ltr";
	if (language == "en") {
		settingLangJson = {
	"back" : "Back",
	"changeicon" : "Change Icon",
	"notification" : "Notification",
	"notification_1" : "Receive notification when new messages are received.",
	"disableautosleep" : "Disable auto sleep",
	"disableautosleep_1" : "Disable auto sleep during conversation.",
	"protocol" : "Communication protocol",
	"reqrestart" : "Restart is required.",
	"customserver" : "Custom Server",
	"customserver_1" : "Be sure to set up only trusted servers.",
	"background" : "Enable Background",
	"background_1" : "If you always allow access to location information, you can receive notifications successfully even in the background.",
	"background_2" : "However, it may consume more battery power.",
	"muteword" : "Mute Word",
	"muteword_1" : "Mutes the specified words.",
	"report" : "Report to developer",
	"setting" : "Settings"
		}
	}else if (language == "ja") {
		settingLangJson = {
	"back" : "戻る",
	"changeicon" : "アイコンを変更",
	"notification" : "通知",
	"notification_1" : "新しいメッセージを受信したときに通知を受け取ります。",
	"disableautosleep" : "自動スリープを無効化",
	"disableautosleep_1" : "自動スリープを無効にします。",
	"protocol" : "通信プロトコル",
	"reqrestart" : "再起動が必要です。",
	"customserver" : "サーバーを変更",
	"customserver_1" : "必ず信頼できるサーバーを設定してください。",
	"background" : "バックグラウンドを有効化",
	"background_1" : "位置情報の取得を常に許可すると、バックグラウンドでも正常に通知を受け取ることができるようになります。",
	"background_2" : "ただし、バッテリーの消費が激しくなる可能性があります。",
	"muteword" : "ミュート",
	"muteword_1" : "指定された言葉をミュートします。",
	"report" : "開発者に報告",
	"setting" : "設定"
		}
	}else if (language == "ru") {
		settingLangJson = {
	"back" : "Назад",
	"changeicon" : "Значок изменения",
	"notification" : "Уведомление",
	"notification_1" : "Получение уведомлений о получении новых сообщений.",
	"disableautosleep" : "Отключить автоматический сон",
	"disableautosleep_1" : "Отключение автоматического перехода в спящий режим во время разговора.",
	"protocol" : "Протокол связи",
	"reqrestart" : "Требуется перезапуск.",
	"customserver" : "Пользовательский сервер",
	"customserver_1" : "Обязательно устанавливайте только доверенные серверы.",
	"background" : "Включить фоновый режим",
	"background_1" : "Если вы всегда разрешаете доступ к информации о местоположении, вы можете успешно получать уведомления даже в фоновом режиме.",
	"background_2" : "Однако это может потреблять больше энергии аккумулятора.",
	"muteword" : "Отключить звук слова",
	"muteword_1" : "Отключает звук указанных слов.",
	"report" : "Отчет разработчику",
	"setting" : "Настройка"
		}
	}else if (language == "cn") {
		settingLangJson = {
	"back" : "返回",
	"changeicon" : "改变图标",
	"notification" : "通知",
	"notification_1" : "当收到新邮件时接收通知。",
	"disableautosleep" : "禁用自动睡眠",
	"disableautosleep_1" : "在对话期间禁止自动睡眠。",
	"protocol" : "通信协议",
	"reqrestart" : "需要重新启动。",
	"customserver" : "自定义服务器",
	"customserver_1" : "请确保只设置受信任的服务器。",
	"background" : "启用背景",
	"background_1" : "如果你总是允许访问位置信息，你甚至可以在后台成功接收通知。",
	"background_2" : "然而，它可能会消耗更多的电池电量。",
	"muteword" : "静音词",
	"muteword_1" : "使指定的单词静音。",
	"report" : "向开发商报告",
	"setting" : "设置"
		}
	}else if (language == "tw") {
		settingLangJson = {
	"back" : "後退",
	"changeicon" : "更改圖標",
	"notification" : "通知",
	"notification_1" : "收到新消息時收到通知。",
	"disableautosleep" : "禁用自動睡眠",
	"disableautosleep_1" : "在對話期間禁用自動睡眠。",
	"protocol" : "通訊協議",
	"reqrestart" : "需要重新啟動。",
	"customserver" : "自定義服務器",
	"customserver_1" : "請務必僅設置受信任的服務器。",
	"background" : "啟用背景",
	"background_1" : "如果您始終允許訪問位置信息，即使在後台也可以成功接收通知。",
	"background_2" : "但是，它可能會消耗更多的電池電量。",
	"muteword" : "靜音詞",
	"muteword_1" : "靜音指定的單詞。",
	"report" : "向開發商報告",
	"setting" : "設定"
		}
	}else if (language == "es") {
		settingLangJson = {
	"back" : "Volver",
	"changeicon" : "Icono de cambio",
	"notification" : "Notificación",
	"notification_1" : "Recibir una notificación cuando se reciben nuevos mensajes.",
	"disableautosleep" : "Desactivar la suspensión automática",
	"disableautosleep_1" : "Desactivar la suspensión automática durante la conversación.",
	"protocol" : "Protocolo de comunicación",
	"reqrestart" : "Es necesario reiniciar.",
	"customserver" : "Servidor personalizado",
	"customserver_1" : "Asegúrese de configurar sólo servidores de confianza.",
	"background" : "Habilitar fondo",
	"background_1" : "Si siempre permite el acceso a la información de ubicación, puede recibir notificaciones con éxito incluso en segundo plano.",
	"background_2" : "Sin embargo, puede consumir más batería.",
	"muteword" : "Silenciar palabra",
	"muteword_1" : "Silencia las palabras especificadas.",
	"report" : "Informe al promotor",
	"setting" : "Ajustes"
		}
	}else if (language == "pt") {
		settingLangJson = {
	"back" : "Voltar",
	"changeicon" : "Mudar Ícone",
	"notification" : "Notificação",
	"notification_1" : "Receber notificação quando novas mensagens são recebidas.",
	"disableautosleep" : "Desactivar o sono automático",
	"disableautosleep_1" : "Desactivar o sono automático durante a conversa.",
	"protocol" : "Protocolo de comunicação",
	"reqrestart" : "É necessário reiniciar.",
	"customserver" : "Servidor Personalizado",
	"customserver_1" : "Não se esqueça de instalar apenas servidores de confiança.",
	"background" : "Habilitar fundo",
	"background_1" : "Se permitir sempre o acesso à informação de localização, pode receber notificações com sucesso, mesmo em segundo plano.",
	"background_2" : "No entanto, pode consumir mais energia da bateria.",
	"muteword" : "Palavra mudo",
	"muteword_1" : "Muda as palavras especificadas.",
	"report" : "Relatório para o desenvolvedor",
	"setting" : "Ajustes"
		}
	}else if (language == "fr") {
		settingLangJson = {
	"back" : "Retour",
	"changeicon" : "Changer l'icône",
	"notification" : "Notification",
	"notification_1" : "Recevez une notification lorsque vous recevez de nouveaux messages.",
	"disableautosleep" : "Désactiver la veille automatique",
	"disableautosleep_1" : "Désactivez la mise en veille automatique pendant la conversation.",
	"protocol" : "Protocole de communication",
	"reqrestart" : "Un redémarrage est nécessaire.",
	"customserver" : "Serveur personnalisé",
	"customserver_1" : "Veillez à ne configurer que des serveurs de confiance.",
	"background" : "Activer le fond",
	"background_1" : "Si vous autorisez toujours l'accès aux informations de localisation, vous pouvez recevoir des notifications avec succès, même en arrière-plan.",
	"background_2" : "Cependant, cela peut consommer davantage de batterie.",
	"muteword" : "Mot muet",
	"muteword_1" : "Met en sourdine les mots spécifiés.",
	"report" : "Rapport au développeur",
	"setting" : "Réglages"
		}
	}else if (language == "de") {
		settingLangJson = {
	"back" : "Zurück",
	"changeicon" : "Symbol ändern",
	"notification" : "Benachrichtigung",
	"notification_1" : "Erhalten Sie eine Benachrichtigung, wenn neue Nachrichten eingegangen sind.",
	"disableautosleep" : "Schlafautomatik deaktivieren",
	"disableautosleep_1" : "Deaktivieren Sie den automatischen Ruhezustand während eines Gesprächs.",
	"protocol" : "Kommunikationsprotokoll",
	"reqrestart" : "Ein Neustart ist erforderlich.",
	"customserver" : "Benutzerdefinierte Server",
	"customserver_1" : "Achten Sie darauf, nur vertrauenswürdige Server einzurichten.",
	"background" : "Hintergrund aktivieren",
	"background_1" : "Wenn Sie den Zugriff auf Standortinformationen immer zulassen, können Sie auch im Hintergrund erfolgreich Benachrichtigungen empfangen.",
	"background_2" : "Dies kann jedoch mehr Akkuleistung verbrauchen.",
	"muteword" : "Wort stummschalten",
	"muteword_1" : "Schaltet die angegebenen Wörter stumm.",
	"report" : "Bericht an den Entwickler",
	"setting" : "Einstellungen"
		}
	}else if (language == "ko") {
		settingLangJson = {
	"back" : "뒤",
	"changeicon" : "아이콘 변경",
	"notification" : "공고",
	"notification_1" : "새 메시지가 수신되면 알림을 받습니다.",
	"disableautosleep" : "자동 절전 비활성화",
	"disableautosleep_1" : "대화 중 자동 절전을 비활성화합니다.",
	"protocol" : "통신 프로토콜",
	"reqrestart" : "다시 시작해야 합니다.",
	"customserver" : "커스텀 서버",
	"customserver_1" : "신뢰할 수 있는 서버만 설정해야 합니다.",
	"background" : "배경 활성화",
	"background_1" : "위치정보 접근을 항상 허용하면 백그라운드에서도 성공적으로 알림을 받을 수 있습니다.",
	"background_2" : "그러나 더 많은 배터리 전력을 소모할 수 있습니다.",
	"muteword" : "음소거 단어",
	"muteword_1" : "지정된 단어를 음소거합니다.",
	"report" : "개발자에게 보고",
	"setting" : "설정"
		}
	}else if (language == "tok") {
		settingLangJson = {
	"back" : "monsi",
	"changeicon" : "ante e sitelen",
	"notification" : "sona sin",
	"notification_1" : "sina kama jo e sin toki la sina kama jo e sona sin.",
	"disableautosleep" : "pini e lape",
	"disableautosleep_1" : "pini e ilo li lape.",
	"protocol" : "nasin pi toki kepeken jan pali pi pana",
	"reqrestart" : "ilo li wile e kama sin.",
	"customserver" : "ante e jan pali pi pana",
	"customserver_1" : "kepeken e ona pilin lon tawa taso",
	"background" : "ken e ilo ni li pali tenpo suli",
	"background_1" : "ilo ni li pali tenpo suli kepeken alasa e ma pi sina tenpo ni.",
	"background_2" : "taso ilo wawa li ken wile moku.",
	"muteword" : "kalama ala",
	"muteword_1" : "kalama ala e toki.",
	"report" : "toki lon jan pali ni",
	"setting" : "ante e ken"
		}
	}
}
if (language == "cn") {
	document.getElementById('html').lang = "zh-CN";
}else if (language == "tw") {
	document.getElementById('html').lang = "zh-TW";
}else{
	document.getElementById('html').lang = language;
}
view();
}