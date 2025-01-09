from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Initialize Safari WebDriver
driver = webdriver.Safari()

# Open a website
driver.get("https://www.bmwusa.com/certified-preowned-search/detail/WBA2J3C01L7E58094")
print("Page title:", driver.title)

# Example: Extract all image links
images = driver.find_elements(By.TAG_NAME, "img")
for img in images:
    src = img.get_attribute("src")
    if src and src.startswith("https"):
        print(src)

# Close the browser
driver.quit()
