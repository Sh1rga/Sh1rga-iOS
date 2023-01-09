//
//  ContentView.swift
//  Sh1rga Watch Watch App
//
//  Created by tsg0o0 on 2022/11/02.
//

import SwiftUI
import WatchConnectivity

struct ContentView: View {
    @State var statusMsg = NSLocalizedString("notLoaded", comment: "")
    @State var serverOnline = false
    @State var statusColor:Color = .gray
    @State var address = UserDefaults.standard.string(forKey: "chat.customServer") ?? "https://chat.api-sh1r.ga"
    @State var addressView = UserDefaults.standard.string(forKey: "chat.customServer") ?? "https://chat.api-sh1r.ga"
    
    var iphoneSession = iphoneConnect()
    
    func loadStatus() {
        statusMsg = NSLocalizedString("loading", comment: "")
        statusColor = .gray
        
        address = UserDefaults.standard.string(forKey: "chat.customServer") ?? "https://chat.api-sh1r.ga"
        let url = URL(string: address + "/status.json") ?? URL(string: "https://example.com/")
        
        struct Record:Codable {
            let online: Bool
        }
        let request = URLRequest(url: url!)
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard let data = data else { return }
            do {
                let jsonData = try JSONDecoder().decode(Record.self, from: data)
                DispatchQueue.main.async {
                    serverOnline = jsonData.online
                    if serverOnline == true {
                        statusMsg = NSLocalizedString("online", comment: "")
                        statusColor = .green
                    }else{
                        statusMsg = NSLocalizedString("offline", comment: "")
                        statusColor = .red
                    }
                }
            } catch _ {
                statusMsg = NSLocalizedString("canNotConnect", comment: "")
                statusColor = .red
            }
        }
        task.resume()
        
    }
    
    var body: some View {
        VStack {
            Image("icon")
                .resizable()
                .frame(width: 130.0, height: 50.0)
                .accessibilityLabel("Shirga Chat")
            if address == "https://chat.api-sh1r.ga" {
                Text("Default Server")
                    .foregroundColor(.gray)
            }else{
                Text(address)
                    .foregroundColor(.gray)
            }
            Text(statusMsg)
                .fontWeight(.bold)
                .foregroundColor(statusColor)
                .multilineTextAlignment(.leading)
                .lineLimit(2)
                .padding(.horizontal, 10.0)
                .frame(height: 50.0)
            Button(NSLocalizedString("loadButton", comment: "")) {
                loadStatus()
            }
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

final class iphoneConnect: NSObject {

    var session: WCSession

    init(session: WCSession  = .default) {
        self.session = session
        super.init()
        self.session.delegate = self
        session.activate()
    }
}

extension iphoneConnect: WCSessionDelegate {
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    }
    
    func session(_ session: WCSession,
                 didReceiveUserInfo userInfo: [String : Any] = [:]) {
        guard let address = userInfo["address"] as? String else { return }
        DispatchQueue.main.async(execute: { () in
            if address == "" {
                UserDefaults.standard.set("https://chat.api-sh1r.ga", forKey: "chat.customServer")
            }else{
                UserDefaults.standard.set(address, forKey: "chat.customServer")
            }
        })
    }
}
