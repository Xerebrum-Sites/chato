import { ChannelIcon } from "@/components/atoms/ChannelIcon";

type Channel = "whatsapp" | "instagram" | "facebook" | "telegram" | "web" | "email";

interface MessageBubbleProps {
  channel: Channel;
  sender: string;
  message: string;
  time: string;
  direction?: "incoming" | "outgoing";
  className?: string;
}

export function MessageBubble({
  channel,
  sender,
  message,
  time,
  direction = "incoming",
  className = "",
}: MessageBubbleProps) {
  const isOutgoing = direction === "outgoing";
  return (
    <div className={`flex items-end gap-2 ${isOutgoing ? "flex-row-reverse" : "flex-row"} ${className}`}>
      {!isOutgoing && <ChannelIcon channel={channel} size="sm" />}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isOutgoing
            ? "bg-violet-600 text-white rounded-br-sm"
            : "bg-white border border-gray-100 rounded-bl-sm"
        }`}
      >
        {!isOutgoing && (
          <p className="text-xs font-semibold text-violet-600 mb-0.5">{sender}</p>
        )}
        <p className={`text-sm ${isOutgoing ? "text-white" : "text-gray-700"}`}>{message}</p>
        <p className={`text-[10px] mt-1 ${isOutgoing ? "text-violet-200" : "text-gray-400"}`}>{time}</p>
      </div>
    </div>
  );
}
