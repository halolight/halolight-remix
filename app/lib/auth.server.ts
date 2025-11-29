import { mockGetCurrentUser, mockLogout, type User } from "./mock/auth";

export type AuthUser = User;

// 从请求中获取认证token
export function getAuthToken(request: Request): string | null {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;

  const tokenMatch = cookie.match(/auth_token=([^;]+)/);
  return tokenMatch ? tokenMatch[1] : null;
}

// 从请求中获取用户数据
export function getUserData(request: Request): User | null {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;

  const userDataMatch = cookie.match(/user_data=([^;]+)/);
  if (!userDataMatch) return null;

  try {
    return JSON.parse(decodeURIComponent(userDataMatch[1]));
  } catch {
    return null;
  }
}

// 验证用户是否已认证
export async function requireAuth(request: Request): Promise<User> {
  const token = getAuthToken(request);
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const user = await mockGetCurrentUser(token);
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return user;
}

// 检查用户是否已认证
export async function isAuthenticated(request: Request): Promise<boolean> {
  try {
    await requireAuth(request);
    return true;
  } catch {
    return false;
  }
}

// 获取当前用户信息
export async function getCurrentUser(request: Request): Promise<User | null> {
  try {
    return await requireAuth(request);
  } catch {
    return null;
  }
}

// 创建登出响应
export async function logout(request: Request): Promise<Response> {
  const token = getAuthToken(request);
  if (token) {
    await mockLogout();
  }

  // 创建清除cookie的响应
  const response = new Response(null, { status: 302, headers: { Location: "/login" } });
  response.headers.append("Set-Cookie", "auth_token=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "user_data=; Path=/; Max-Age=0");

  return response;
}

// 创建认证响应（设置cookie）
export function createAuthResponse(user: User, token: string, redirectTo: string = "/"): Response {
  const response = new Response(null, {
    status: 302,
    headers: { Location: redirectTo }
  });

  response.headers.append("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; Max-Age=86400`);
  response.headers.append("Set-Cookie", `user_data=${encodeURIComponent(JSON.stringify(user))}; Path=/; Max-Age=86400`);

  return response;
}