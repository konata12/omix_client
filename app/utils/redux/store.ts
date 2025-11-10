import authSlice from "@/app/utils/redux/auth/authSlice";
import faqFormsSlice from "@/app/utils/redux/general_data/faq/faqFormsSlice";
import faqSlice from "@/app/utils/redux/general_data/faq/faqSlice";
import generalDataSlice from "@/app/utils/redux/general_data/generalSlice";
import navigationSlice from "@/app/utils/redux/navigation/navigationSlice";
import grainDryerSlice from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// REDUCERS
// Define the root state type
export type RootState = ReturnType<typeof store.getState> & PersistPartial;

// Define the app dispatch type
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
	navigation: navigationSlice,
	// API
	auth: authSlice,
	faq: faqSlice,
	grainDryer: grainDryerSlice,

	// FORM DATA
	faqForms: faqFormsSlice,

	// FORM DATA AND API
	generalData: generalDataSlice,
});

const storage = createWebStorage("local");
const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// todo check if this is needed
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
