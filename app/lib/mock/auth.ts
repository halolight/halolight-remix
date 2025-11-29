export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user" | "manager";
  permissions: string[];
};

export type LoginCredentials = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  company?: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  token: string;
  password: string;
  confirmPassword: string;
};

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@halolight.h7ml.cn",
    name: "管理员",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    role: "admin",
    permissions: ["read", "write", "delete", "manage"],
  },
  {
    id: "2",
    email: "user@halolight.h7ml.cn",
    name: "普通用户",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=64&h=64&fit=crop&crop=face",
    role: "user",
    permissions: ["read"],
  },
  {
    id: "3",
    email: "manager@halolight.h7ml.cn",
    name: "部门经理",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    role: "manager",
    permissions: ["read", "write"],
  },
];

// 模拟登录验证
export async function mockLogin(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = mockUsers.find(u => u.email === credentials.email);
  if (!user) {
    throw new Error("用户不存在");
  }

  // 模拟密码验证（演示密码：123456）
  if (credentials.password !== "123456") {
    throw new Error("密码错误");
  }

  return {
    user,
    token: `mock-token-${user.id}-${Date.now()}`,
  };
}

// 模拟注册
export async function mockRegister(data: RegisterData): Promise<{ user: User; token: string }> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 检查邮箱是否已存在
  const existingUser = mockUsers.find(u => u.email === data.email);
  if (existingUser) {
    throw new Error("邮箱已被注册");
  }

  // 创建新用户
  const newUser: User = {
    id: String(mockUsers.length + 1),
    email: data.email,
    name: data.name,
    role: "user",
    permissions: ["read"],
  };

  mockUsers.push(newUser);

  return {
    user: newUser,
    token: `mock-token-${newUser.id}-${Date.now()}`,
  };
}

// 模拟忘记密码
export async function mockForgotPassword(data: ForgotPasswordData): Promise<void> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = mockUsers.find(u => u.email === data.email);
  if (!user) {
    throw new Error("用户不存在");
  }

  // 模拟发送重置邮件
  console.log(`重置密码邮件已发送到: ${data.email}`);
}

// 模拟重置密码
export async function mockResetPassword(data: ResetPasswordData): Promise<void> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  if (data.password !== data.confirmPassword) {
    throw new Error("两次输入的密码不一致");
  }

  // 模拟token验证（实际项目中应该验证真实token）
  if (!data.token.startsWith("mock-reset-token")) {
    throw new Error("重置链接无效或已过期");
  }

  console.log("密码重置成功");
}

// 模拟获取当前用户信息
export async function mockGetCurrentUser(token: string): Promise<User | null> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  // 简单的token解析
  const userId = token.split("-")[2];
  return mockUsers.find(u => u.id === userId) || null;
}

// 模拟退出登录
export async function mockLogout(): Promise<void> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  console.log("退出登录成功");
}