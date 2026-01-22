const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Create a new service instance for each test to ensure isolation
        service = new TodoService();
        // This is a bit of a hack to reset the singleton for testing purposes
        service.todos = [];
    });

    test('should add a new todo', () => {
        // TODO: Call the addTodo method with some text.
        // Then, assert that the service's todos array has a length of 1.
        // Assert that the text of the first todo matches the input text.
        const todoText = 'Học bài Lab 3';

        // 1. Gọi hàm thêm task
        service.addTodo(todoText);

        // 2. Kiểm tra mảng todos có độ dài là 1
        expect(service.todos.length).toBe(1);

        // 3. Kiểm tra nội dung text của task đầu tiên có khớp không
        expect(service.todos[0].text).toBe(todoText);
    });

    test('should toggle the completed state of a todo', () => {
       // 1. Thêm 1 task để test
        service.addTodo('Task cần đổi trạng thái');
        
        // Lấy ID của task vừa tạo (vì ID được sinh ngẫu nhiên bằng Date.now())
        const todoId = service.todos[0].id;

        // 2. Gọi hàm toggle lần 1
        service.toggleTodoComplete(todoId);

        // 3. Kiểm tra trạng thái completed phải là true
        expect(service.todos[0].completed).toBe(true);

        // 4. Gọi hàm toggle lần 2 (đổi ngược lại)
        service.toggleTodoComplete(todoId);
        
        // Kiểm tra trạng thái completed phải quay về false
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
       // 1. Thêm 1 task
        service.addTodo('Task cần xóa');
        const todoId = service.todos[0].id;

        // Đảm bảo task đã được thêm vào trước khi xóa
        expect(service.todos.length).toBe(1);

        // 2. Gọi hàm xóa theo ID
        service.removeTodo(todoId);

        // 3. Kiểm tra mảng todos giờ phải rỗng
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        // 1. Gọi hàm thêm với chuỗi rỗng
        service.addTodo('');

        // 2. Kiểm tra mảng todos vẫn rỗng (không được thêm vào)
        expect(service.todos.length).toBe(0);
    });
});
