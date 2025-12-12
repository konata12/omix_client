import { reduxSerializeError } from "@/app/services/admin/response.service";
import { News, NewsData, NewsListData, NewsStringValuesEnum } from "@/app/types/data/news";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NewsData = {
	news: [],
	news_modal_is_open: [],
	error: {
		getAll: null,
		update: null,
		create: null,
		delete: [],
	},
	status: {
		getAll: null,
		update: null,
		create: null,
		delete: null,
	},
};

export const baseUrlNews = "news";

export const getNews = createAsyncThunk("news/getNews", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get<NewsListData[]>(`${baseUrlNews}`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		return rejectWithValue(reduxSerializeError(error));
	}
});

export const createNews = createAsyncThunk(
	"news/createNews",
	async (data: News, { rejectWithValue }) => {
		try {
			// const formData = await createNewsFormData(data, "create");
			// console.log("formData: ", Array.from(formData));
			const response = await axiosInstance.post<NewsListData[]>(`${baseUrlNews}`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const updateNews = createAsyncThunk(
	"news/updateNews",
	async (props: News, { rejectWithValue }) => {
		try {
			const { id, ...otherData } = props;
			// const formData = await createNewsFormData(otherData, "update");
			// console.log("formData: ", Array.from(formData));
			await axiosInstance.put(`${baseUrlNews}/${id}`, otherData);

			return props;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const deleteNews = createAsyncThunk<string, string, { rejectValue: ErrorResponse }>(
	"news/deleteNews",
	async (id: string, { rejectWithValue }) => {
		try {
			await axiosInstance.delete(`${baseUrlNews}/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue({ ...reduxSerializeError(error), id });
		}
	},
);

export const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {
		handleNewsModal(state, action: { payload: { i: number; value: boolean } }) {
			const { i, value } = action.payload;
			state.news_modal_is_open[i] = value;
		},

		setUpdateError(state, action: { payload: string | null }) {
			if (action.payload) {
				state.error.update = { message: action.payload, statusCode: 500 };
			} else if (!action.payload) {
				state.error.update = null;
			}
		},
	},
	extraReducers(builder) {
		builder
			// GET
			.addCase(getNews.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(getNews.fulfilled, (state, action) => {
				state.status.getAll = "succeeded";
				state.news = action.payload;
				state.news_modal_is_open = new Array(state.news.length).fill(false);
				state.error.delete = new Array(state.news.length).fill(null);
			})
			.addCase(getNews.rejected, (state, action) => {
				state.status.getAll = "failed";
				console.log(action.payload);
				state.error.getAll = action.payload as ErrorResponse;
			})

			// CREATE
			.addCase(createNews.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(createNews.fulfilled, (state, action) => {
				state.status.create = "succeeded";
				state.news = action.payload;
				state.news_modal_is_open = new Array(state.news.length).fill(false);
				state.error.delete = new Array(state.news.length).fill(null);
			})
			.addCase(createNews.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE
			.addCase(updateNews.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(updateNews.fulfilled, (state, action) => {
				state.status.update = "succeeded";
				const index = state.news.findIndex((news) => `${news.id}` === action.payload.id);
				if (action.payload[NewsStringValuesEnum.TITLE]) {
					state.news[index][NewsStringValuesEnum.TITLE] =
						action.payload[NewsStringValuesEnum.TITLE];
				}
			})
			.addCase(updateNews.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE
			.addCase(deleteNews.pending, (state, action: PayloadAction<string | undefined>) => {
				state.status.delete = "loading";
				const index = state.news.findIndex((grain_dryer) => grain_dryer.id === action.payload);
				if (index !== -1) {
					state.error.delete[index] = null;
				}
			})
			.addCase(deleteNews.fulfilled, (state, action: PayloadAction<string>) => {
				state.status.delete = "succeeded";
				const index = state.news.findIndex((grain_dryer) => {
					return grain_dryer.id === action.payload;
				});
				if (index !== -1) {
					state.news.splice(index, 1);
					state.news_modal_is_open.splice(index, 1);
					state.error.delete.splice(index, 1);
				}
			})
			.addCase(deleteNews.rejected, (state, action) => {
				state.status.delete = "failed";

				if (action.payload) {
					const error = action.payload;
					const index = state.news.findIndex((grain_dryer) => grain_dryer.id === error.id);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const { handleNewsModal, setUpdateError } = newsSlice.actions;
export default newsSlice.reducer;
