import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
	'login',
	async ({ username, password }: { username: string; password: string }) => {
		const response = await fetch(`${__API_URL__}/api/v1/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});
		const result = await response.json();
		return result;
	}
);
