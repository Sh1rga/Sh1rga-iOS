//
//  AppDelegate.swift
//  Sh1rga
//
//  Created by tsg0o0 on 2022/05/14.
//

import UIKit
import AVFoundation
import CoreLocation
import WatchConnectivity

@main
class AppDelegate: UIResponder, UIApplicationDelegate , CLLocationManagerDelegate {
    var audioPlayer: AVAudioPlayer!
    var locationManager : CLLocationManager!

    var joinFlag = false
    var lang = "en"
    var selectedTabBar:String? = "Chat"
    
    var autoSleepDisable = false
    var enableBackground = false
    var muteWord:String? = nil
    var chatCustomServer:String? = ""
    var enableMuteWord = false
    var allowMuteWord = false
    var chatAccountID:String? = ""
    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        autoSleepDisable = UserDefaults.standard.bool(forKey: "chat.autoSleepDisable")
        chatCustomServer = UserDefaults.standard.string(forKey: "chat.customServer") ?? ""
        WCSession.default.transferUserInfo(["address" : self.chatCustomServer as Any])
        #if !RELEASEBYPASS
        //if ALTRELEASE
        let status = CLLocationManager.authorizationStatus()
        if (status == .authorizedAlways) {
            enableBackground = UserDefaults.standard.bool(forKey: "chat.enableBackground")
        }else{
            enableBackground = false
            UserDefaults.standard.set(false, forKey: "chat.enableBackground")
        }
        #else
        //#elseif RELEASEBYPASS
        chatAccountID = UserDefaults.standard.string(forKey: "chat.accountID") ?? ""
        enableMuteWord = UserDefaults.standard.bool(forKey: "chat.enableMuteWord")
        muteWord = UserDefaults.standard.string(forKey: "chat.muteWord") ?? ""
        #endif
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

