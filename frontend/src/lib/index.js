export async function postForm(path, body) {
	const response = await fetch(path, {
		method: 'POST',
		credentials: 'include',
		body
	});
	return response;
}

export async function postJson(path, body) {
	const response = await fetch(path, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body ?? {})
	});
	return response;
}

export async function apiRequest(path, { method = 'POST', body = undefined, json = true } = {}) {
	const response = await fetch(path, {
		method,
		credentials: 'include',
		headers: json ? { 'Content-Type': 'application/json' } : undefined,
		body: json ? JSON.stringify(body ?? {}) : body
	});
	const data = await response.json().catch(() => null);
	return { ok: response.ok, status: response.status, data };
}
