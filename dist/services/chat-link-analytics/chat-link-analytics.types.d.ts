/**
 * Counted per conversation, not per message. A chat that was shown the same CTA
 * eight times is one chat that saw it, so a chattier prompt can never flatter or
 * flatten the rate. `timesShown` and `totalClicks` keep the raw tallies.
 */
export interface ChatLinkTally {
    chatsShown: number;
    chatsClicked: number;
    timesShown: number;
    totalClicks: number;
    ctr: number | null;
}
export interface ChatLinkLabelMetrics extends ChatLinkTally {
    label: string;
}
export interface ChatLinkMetrics extends ChatLinkTally {
    byLabel: ChatLinkLabelMetrics[];
}
export interface ChatLinkDailyMetrics extends ChatLinkTally {
    date: string;
}
