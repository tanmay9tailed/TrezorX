import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventPayload } from 'ethers';

interface Wallets{
    walletNo: number,
    publicKey: string,
    privateKey: string,
}

interface Account {
    account_name: string;
    seed: string;
    currency: string;
    wallets: Wallets[];
    default_wallet: number;
}

export interface AccountsState {
    default_account: number;
    details: Account[];
}

const initialState: AccountsState = {
    default_account: -1, 
    details: [],
};

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addFromLocalStorage(state, action: PayloadAction<AccountsState>){
            // console.log("payload : ",action.payload)
            return { ...state, ...action.payload };
        },
        setDefaultWallet(state, action: PayloadAction<number>) {
            const default_account = state.default_account;
            state.details[default_account].default_wallet = action.payload;
        },
        setDefaultAccount(state, action: PayloadAction<number>) {
            state.default_account = action.payload;
        },
        addAccount(state, action: PayloadAction<Account>) {
            state.details.push(action.payload);
        },
        addWalletToAccount(state, action: PayloadAction<Wallets>) {
            const default_account = state.default_account;
            state.details[default_account].wallets.push(action.payload);
        },
        removeWallet(state, action: PayloadAction<number>) {
            const default_account = state.default_account;
            const wallets = state.details[default_account].wallets;
            wallets.splice(action.payload, 1);
            if (state.details[default_account].default_wallet >= action.payload) {
                state.details[default_account].default_wallet = Math.max(0, state.details[default_account].default_wallet - 1);
            }
        },        
    },
});

export const { addFromLocalStorage, setDefaultWallet, setDefaultAccount, addAccount, addWalletToAccount, removeWallet } = accountsSlice.actions;
export default accountsSlice.reducer;
