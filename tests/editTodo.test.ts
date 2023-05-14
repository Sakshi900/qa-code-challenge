
import { Todo_Items, TODO_ITEMS } from '../src/const';
import { test, expect } from '../src/_fixtures/test-fixtures'


test.describe.parallel('Edit Todo Tests', () => {

    test.beforeEach(async ({ todoPage }) => {
        await todoPage.waitForAppready();
        await expect(todoPage.todoElements.createTodoInput).toBeVisible();
        await todoPage.createTodo(TODO_ITEMS[0])
    })
    test('User Verifies List should not be empty', async ({ todoPage }) => {
        expect(await todoPage.todoElements.itemsAdded.count()).toBeGreaterThanOrEqual(1)
    })
    test('User Verifies the item to be edited should be present in list', async ({ todoPage }) => {
        expect(await todoPage.todoElements.itemsAdded.first().textContent()).toBe(Todo_Items.task1.taskValue.toString().trim())
    })
    test('User Edits the Added Item Present In List', async ({ todoPage }) => {
        await test.step('User double click on item to edit', async () => {
            await todoPage.editTodo(TODO_ITEMS[0])
            await expect(todoPage.todoElements.editingElement).toBeVisible()
            expect(await todoPage.todoElements.editingElement.count()).toBe(1)
        })
        await test.step('User renames/edits the selected item from list', async () => {
            await todoPage.todoElements.renameElement.clear()
            await todoPage.todoElements.renameElement.type(Todo_Items.task3.taskValue.toString())
            await todoPage.page.keyboard.press('Enter')
        })
        await test.step('User verifies the updated item in the list', async () => {
            expect(await todoPage.todoElements.itemsAdded.count()).toBeGreaterThanOrEqual(1)
            expect(await todoPage.todoElements.itemsAdded.first().textContent()).toBe(Todo_Items.task3.taskValue.toString().trim())
        })
    })
    test('Removing Of Item On Clearing The Text Upon Editing', async ({ todoPage }) => {
        await test.step('User double click on item to edit', async () => {
            await todoPage.editTodo(TODO_ITEMS[0])
            await expect(todoPage.todoElements.editingElement).toBeVisible()
            expect(await todoPage.todoElements.editingElement.count()).toBe(1)
        })
        await test.step('User clears the selected item text from list', async () => {
            await todoPage.todoElements.renameElement.clear()
            await todoPage.page.keyboard.press('Enter')
        })
        await test.step('User verifies the removed item from  the list', async () => {
            expect(await todoPage.todoElements.itemsAdded.count()).toBe(0)
        })
    })
    
    test('Canceling The Editing Item', async ({ todoPage }) => {
        await test.step('User double click on entered todo to edit', async () => {
            await todoPage.editTodo(TODO_ITEMS[0])
            await expect(todoPage.todoElements.editingElement).toBeVisible()
            expect(await todoPage.todoElements.editingElement.count()).toBe(1)
        })
        await test.step('User presses ESC to cancel edit', async () => {
            await todoPage.page.keyboard.press('Escape')
            await expect(todoPage.todoElements.editingElement).not.toBeVisible()
            expect(await todoPage.todoElements.editingElement.count()).toBe(0)
        })
        await test.step('User verifies non-edited item should remains in list', async () => {
            expect(await todoPage.todoElements.itemsAdded.count()).toBeGreaterThanOrEqual(1)
            expect(await todoPage.todoElements.itemsAdded.first().textContent()).toBe(Todo_Items.task1.taskValue.toString().trim())
        })
    })
})


