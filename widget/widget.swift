//
//  widget.swift
//  widget
//
//  Created by tsg0o0 on 2022/11/01.
//

import WidgetKit
import SwiftUI
import Intents
import SystemConfiguration

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationIntent(), address: "Default")
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), configuration: ConfigurationIntent(), address: "Default")
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        
        let groupUserDefaults = UserDefaults(suiteName: "group.com.tsg0o0.sh1rga")
        let serverAddress = groupUserDefaults!.string(forKey: "chat.customServer")
        
        
        let currentDate = Date()
        for hourOffset in 0 ..< 96 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration, address: serverAddress!)
            
            
            
            entries.append(entry)
        }
        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let address: String
}

struct widgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        ZStack {
            Color(red: 17/255, green: 17/255, blue: 17/255)
                .ignoresSafeArea()
            
            VStack {
                Image("chatLogo")
                    .resizable(resizingMode: .stretch)
                    .frame(width: 130.0, height: 50.0)
                    .aspectRatio(contentMode: .fit)
                    .accessibilityLabel("Shirga Chat")
                Text(NSLocalizedString("yourServerIs", comment: ""))
                    .foregroundColor(.gray)
                    .padding(.bottom, 0.2)
                if entry.address == "" {
                    Text("Default")
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                        .lineLimit(2)
                        .padding(.horizontal, 10.0)
                }else{
                    Text(entry.address)
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                        .lineLimit(2)
                        .padding(.horizontal, 10.0)
                }
            }
        }
    }
}

@main
struct widget: Widget {
    let kind: String = "chatWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            widgetEntryView(entry: entry)
        }
        .configurationDisplayName("Sh1rga Chat")
        .description("Check your custom server address.")
        .supportedFamilies([.systemSmall])
    }
}

struct widget_Previews: PreviewProvider {
    static var previews: some View {
        widgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), address: "Default"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
