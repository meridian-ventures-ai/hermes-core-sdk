export interface CreateMessageRequest {
    id?: string | null;
    chatId: string;
    role?: string | null;
    content?: string | null;
    messageType?: string | null;
    metadata?: any | null;
    parts?: any | null;
}

export interface CreateMessageFeedbackRequest {
    messageId: string;
    actorType?: 'user' | 'system' | 'admin' | 'evaluator'; // default: 'user'
    feedbackType: 'like' | 'dislike' | 'flag' | 'rating';
    comment?: string | null;
}


export interface Message {
    id: string;
    chatId: string;
    role: string;
    error?: string | null;
    content: string;
    messageType: string;
    metadata: any;
    parts: any;
    createdAt: string;
    updatedAt: string;
}

export interface MessageFeedback {
    id: string;
    messageId: string;
    actorType: 'user' | 'system' | 'admin' | 'evaluator';
    feedbackType: 'like' | 'dislike' | 'flag' | 'rating';
    comment: string | null;
    createdAt: string;
}












    