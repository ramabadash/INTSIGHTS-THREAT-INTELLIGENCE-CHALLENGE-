export interface Paste {
  Title: string;
  Author: string;
  Content: string;
  Date: string;
}

/* ----- ANALYTICS ----- */
export interface AuthorAnalytics {
  _id: string;
  Total: number;
}

export interface WordsAnalytics {
  total_pastes_bitcoin: number;
  total_pastes_porn: number;
  total_pastes_gun: number;
  total_pastes_creditcard: number;
  total_pastes_onion: number;
  total_pastes_drug: number;
  total_pastes_hack: number;
  total_pastes_leak: number;
  total_pastes_child: number;
  total_pastes_dark: number;
  total_pastes_sex: number;
  total_pastes_payment: number;
  total_pastes_hot: number;
}

/* ----- NOTIFICATION ----- */

export interface Notification {
  message: string;
  type: string;
  time: string;
}
