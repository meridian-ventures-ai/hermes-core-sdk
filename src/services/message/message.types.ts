export interface CreateMessageRequest {
    id?: string | null;
    chat_id: string;
    role?: string | null;
    content?: string | null;
    message_type?: string | null;
    metadata?: any | null;
    parts?: any | null;
}

export interface CreateMessageFeedbackRequest {
    message_id: string;
    actor_type?: 'user' | 'system' | 'admin' | 'evaluator'; // default: 'user'
    feedback_type: 'like' | 'dislike' | 'flag' | 'rating';
    comment?: string | null;
}


export interface Message {
    id: string;
    chat_id: string;
    role: string;
    error?: string | null;
    content: string;
    message_type: string;
    metadata: any;
    parts: any;
    created_at: string;
    updated_at: string;
}

export interface MessageFeedback {
    id: string;
    message_id: string;
    actor_type: 'user' | 'system' | 'admin' | 'evaluator';
    feedback_type: 'like' | 'dislike' | 'flag' | 'rating';
    comment: string | null;
    created_at: string;
    updated_at: string;
}












    