
export interface WhoisData {
  createdDate: string;
  updatedDate: string;
  expiresDate: string;
  registrant: {
    name: string;
    organization: string;
  };
  contactEmail: string;
}

export interface WhoisRecord {
  WhoisRecord: WhoisData;
}

export interface ApiError {
  ErrorMessage: {
    msg: string;
  };
}

export type ApiResponse = WhoisRecord | ApiError;

export interface ResultState {
  status: 'available' | 'taken' | 'error' | 'idle';
  domain: string;
  message: string;
  whoisData?: WhoisData;
}
