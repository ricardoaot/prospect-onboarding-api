export class Prospect {
    constructor(
        public name: string,
        public lastname: string,
        public birthday: Date,
        public email: string,
        public phone: string,
        public status: 'pending' | 'approved' | 'rejected' = 'pending',
    ) {}
}
  