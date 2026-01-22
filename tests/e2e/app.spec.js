const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // 1. Khởi động ứng dụng Electron
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();
    
    // Chờ giao diện load xong
    await window.waitForLoadState('domcontentloaded');

    const taskText = 'Học bài Lab 3 Playwright';

    // --- Task 1: Add a new todo item ---
    // Tìm ô input và nhập text
    await window.locator('#todo-input').fill(taskText);
    // Tìm nút Add và click (đảm bảo ID này khớp với index.html)
    await window.locator('#add-todo-btn').click();

    // --- Task 2: Verify the todo item was added ---
    // Tìm item vừa tạo
    const todoItem = window.locator('.todo-item').filter({ hasText: taskText });
    // Kiểm tra nó có hiển thị và chứa text đúng không
    await expect(todoItem).toBeVisible();
    await expect(todoItem).toContainText(taskText);

    // --- Task 3: Mark the todo item as complete ---
    // Tìm checkbox bên trong item đó
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
    // Kiểm tra xem class 'completed' có được thêm vào không
    await expect(todoItem).toHaveClass(/completed/);

    // --- Task 4: Delete the todo item ---
    // Tìm nút xóa bên trong item đó
    const deleteBtn = todoItem.locator('.delete-btn');
    await deleteBtn.click();
    // Kiểm tra item đó đã biến mất
    await expect(todoItem).not.toBeVisible();

    // Đóng ứng dụng
    await electronApp.close();
});