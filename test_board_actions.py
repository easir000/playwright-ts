from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Function to create a board
def create_board(driver, board_name):
    try:
        # Navigate to the page where boards are managed
        driver.get("http://localhost:3000/")

        # Click on create new board section
        create_board_element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-cy='create-board']"))
        )
        create_board_element.click()

        # Wait for the input field to appear
        new_board_input = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".new-board-input"))
        )

        # Enter board name and press Enter
        new_board_input.send_keys(board_name)
        new_board_input.send_keys(Keys.ENTER)

        # Wait for board creation confirmation
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-cy='board-item']"))
        )

        # Verify board creation
        boards = driver.find_elements(By.CSS_SELECTOR, "[data-cy='board-item']")
        assert any(board_name in board.text for board in boards), "Board creation failed"
        print(f"Board '{board_name}' created successfully.")

    except Exception as e:
        print(f"Error creating board: {str(e)}")

# Function to add a list
def add_list(driver, list_name):
    try:
        # Click on create new list button to show the input field
        add_list_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-cy='create-list']"))
        )
        add_list_button.click()

        # Wait for the input field to become visible and interactive
        new_list_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-cy='add-list-input']"))
        )
        
        # Use JavaScript to ensure the input field is focused and set the value
        driver.execute_script("arguments[0].focus();", new_list_input)
        driver.execute_script("arguments[0].value = arguments[1];", new_list_input, list_name)

        # Confirm the value is set correctly
        assert new_list_input.get_attribute("value") == list_name, "Failed to set the list name in the input field"

        # Press Enter to submit
        new_list_input.send_keys(Keys.ENTER)

        # Wait for the Add list button and click it if Enter doesn't work
        try:
            save_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Add list')]"))
            )
            save_button.click()
        except Exception:
            print("Save button with text 'Add list' not found or not clickable.")

        # Wait for list creation confirmation
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, f"[data-cy='list']"))
        )

        # Verify list creation
        lists = driver.find_elements(By.CSS_SELECTOR, "[data-cy='list']")
        assert any(list_name in list_item.text for list_item in lists), f"List '{list_name}' creation failed"

        print(f"List '{list_name}' added successfully.")

    except Exception as e:
        print(f"Error adding list: {str(e)}")


# Function to delete a list
def delete_list(driver, list_name):
    try:
        # Find the list by name
        lists = driver.find_elements(By.CSS_SELECTOR, "[data-cy='list']")
        target_list = None
        for list_item in lists:
            if list_name in list_item.text:
                target_list = list_item
                break

        assert target_list, f"List '{list_name}' not found"
        print(f"Found list: {list_name}")

        # Click on the list options button
        list_options_button = target_list.find_element(By.CSS_SELECTOR, "[data-cy='list-options']")
        list_options_button.click()

        # Click on the delete button
        delete_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-cy='delete-list']"))
        )
        delete_button.click()

        # Wait for deletion confirmation
        time.sleep(1)

        # Verify list deletion
        lists_after_deletion = driver.find_elements(By.CSS_SELECTOR, "[data-cy='list']")
        assert not any(list_name in list_item.text for list_item in lists_after_deletion), "List deletion failed"

        print(f"List '{list_name}' deleted successfully.")

    except Exception as e:
        print(f"Error deleting list: {str(e)}")

if __name__ == "__main__":
    # Initialize Selenium webdriver
    driver = webdriver.Chrome()  # Update with your preferred browser driver

    try:
        # Example usage:
        create_board(driver, "New Board Name")
        
        # Add two lists
        add_list(driver, "To Do")
        add_list(driver, "Doing")
        
        # Delete a list
        delete_list(driver, "To Do")

    finally:
        # Close the browser session
        driver.quit()
