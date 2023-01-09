//
//  ViewController.swift
//  Sh1rga
//
//  Created by tsg0o0 on 2022/11/02.
//

import UIKit
import WebKit
import SystemConfiguration
import Foundation

class ViewController: UIViewController , WKNavigationDelegate , WKUIDelegate , UIApplicationDelegate , UITextFieldDelegate{
    
    var appDelegate:AppDelegate = UIApplication.shared.delegate as! AppDelegate
    var webView: WKWebView!
    var firstTime = true
    var internetConnection = false

    override func viewDidLoad() {
        super.viewDidLoad()
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .nonPersistent()
        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.navigationDelegate = self
        webView!.isOpaque = false
        webView!.backgroundColor = UIColor(red: 17/255, green: 17/255, blue: 17/255, alpha: 1.0)
        webView.uiDelegate = self
        view = webView
        if let html = Bundle.main.path(forResource: "app/loading", ofType: "html") {
              let url = URL(fileURLWithPath: html)
              let request = URLRequest(url: url)
              webView.load(request)
        }
        NotificationCenter.default.addObserver(self, selector: #selector(boldTextStatusDidChangeNotification(notification:)), name: UIAccessibility.boldTextStatusDidChangeNotification, object: nil)
        if #available(iOS 14.0, *) {
            NotificationCenter.default.addObserver(self, selector: #selector(buttonShapesEnabledStatusDidChangeNotification(notification:)), name: UIAccessibility.buttonShapesEnabledStatusDidChangeNotification, object: nil)
        }
        NotificationCenter.default.addObserver(self, selector: #selector(reduceTransparencyStatusDidChangeNotification(notification:)), name: UIAccessibility.reduceTransparencyStatusDidChangeNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(reduceMotionStatusDidChangeNotification(notification:)), name: UIAccessibility.reduceMotionStatusDidChangeNotification, object: nil)
    }
    
    func loadSh1rga() {
        internetConnection = CheckReachability(host_name: "sh1r.ga")
        appDelegate.lang = "en"
        if Locale.current.languageCode == "ar" {
            appDelegate.lang = "ar"
        }
        if Locale.current.languageCode == "zh" {
            if Locale.current.identifier == "zh-TW" || Locale.current.identifier.prefix(7) == "zh-Hant"{
                appDelegate.lang = "tw"
            }else{
                appDelegate.lang = "cn"
            }
        }
        if Locale.current.languageCode == "de" {
            appDelegate.lang = "de"
        }
        if Locale.current.languageCode == "es" {
            appDelegate.lang = "es"
        }
        if Locale.current.languageCode == "fr" {
            appDelegate.lang = "fr"
        }
        if Locale.current.languageCode == "ja" {
            appDelegate.lang = "ja"
        }
        if Locale.current.languageCode == "pt" {
            appDelegate.lang = "pt"
        }
        if Locale.current.languageCode == "ru" {
            appDelegate.lang = "ru"
        }
        if Locale.current.languageCode == "ko" {
            appDelegate.lang = "ko"
        }
        if Locale.current.languageCode == "tok" {
            appDelegate.lang = "tok"
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [self] in
            if internetConnection == true {
                if let html = Bundle.main.path(forResource: "app/chat/index", ofType: "html") {
                    let url = URL(fileURLWithPath: html)
                    let request = URLRequest(url: url)
                    webView.load(request)
                }
                
            }else{
                if let html = Bundle.main.path(forResource: "app/chat/error", ofType: "html") {
                    let url = URL(fileURLWithPath: html)
                    let request = URLRequest(url: url)
                    webView.load(request)
                    firstTime = false
                }
            }
        }
    }
    
    func CheckReachability(host_name:String)->Bool{

        let reachability = SCNetworkReachabilityCreateWithName(nil, host_name)!
        var flags = SCNetworkReachabilityFlags.connectionAutomatic
        if !SCNetworkReachabilityGetFlags(reachability, &flags) {
            return false
        }
        let isReachable = (flags.rawValue & UInt32(kSCNetworkFlagsReachable)) != 0
        let needsConnection = (flags.rawValue & UInt32(kSCNetworkFlagsConnectionRequired)) != 0
        return (isReachable && !needsConnection)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        
        webView.evaluateJavaScript("if (getParam('protocol') == null) {history.replaceState('','','?protocol=https');location.reload();}")
        
        if firstTime == true {
            loadSh1rga()
        }
        if UIAccessibility.isBoldTextEnabled {
            webView.evaluateJavaScript("window.setTimeout(\"isBoldTextEnabled(true);\", 200);")
        }
        if #available(iOS 14.0, *) {
            if UIAccessibility.buttonShapesEnabled {
                webView.evaluateJavaScript("window.setTimeout(\"buttonShapesEnabled(true);\", 200);")
            }
        }
        if UIAccessibility.isReduceTransparencyEnabled {
            webView.evaluateJavaScript("window.setTimeout(\"isReduceTransparencyEnabled(true);\", 200);")
        }
        if UIAccessibility.isReduceMotionEnabled {
            webView.evaluateJavaScript("window.setTimeout(\"isReduceMotionEnabled(true);\", 200);")
        }
    }
    
    @objc private func boldTextStatusDidChangeNotification(notification: Notification) {
        if UIAccessibility.isBoldTextEnabled {
            webView.evaluateJavaScript("isBoldTextEnabled(true);")
        }else{
            webView.evaluateJavaScript("isBoldTextEnabled(false);")
        }
    }
    @objc private func buttonShapesEnabledStatusDidChangeNotification(notification: Notification) {
        if #available(iOS 14.0, *) {
            if UIAccessibility.buttonShapesEnabled {
                webView.evaluateJavaScript("buttonShapesEnabled(true);")
            }else{
                webView.evaluateJavaScript("buttonShapesEnabled(false);")
            }
        }
    }
    @objc private func reduceTransparencyStatusDidChangeNotification(notification: Notification) {
        if UIAccessibility.isReduceTransparencyEnabled {
            webView.evaluateJavaScript("isReduceTransparencyEnabled(true);")
        }else{
            webView.evaluateJavaScript("isReduceTransparencyEnabled(false);")
        }
    }
    @objc private func reduceMotionStatusDidChangeNotification(notification: Notification) {
        if UIAccessibility.isReduceMotionEnabled {
            webView.evaluateJavaScript("isReduceMotionEnabled(true);")
        }else{
            webView.evaluateJavaScript("isReduceMotionEnabled(false);")
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        
        if firstTime == true && internetConnection == true {
            firstTime = false
        }
        
        if "sh1rga://" == navigationAction.request.url!.absoluteString.prefix(9) {
                decisionHandler(.cancel)
            
            if navigationAction.request.url!.absoluteString == "sh1rga://reload" {
                
                firstTime = true
                loadSh1rga()
                
            }else if navigationAction.request.url!.absoluteString == "sh1rga://flag/join/true" {
                appDelegate.joinFlag = true
            }else if navigationAction.request.url!.absoluteString == "sh1rga://flag/join/false" {
                appDelegate.joinFlag = false
            }
            
        } else {
            if "file://" == navigationAction.request.url!.absoluteString.prefix(7) {
                decisionHandler(.allow)
            }else{
                UIApplication.shared.open(navigationAction.request.url!, options: [:], completionHandler: nil)
                decisionHandler(.cancel)
            }
            
        }
    }

override var keyCommands: [UIKeyCommand]? {
    return [
        .init(title: "Reload", action: #selector(self.commandReload), input: "r", modifierFlags: [.command])
        ]
}
@objc func commandReload() {
    if appDelegate.joinFlag == false {
    webView.reload()
    }
}
    
}
