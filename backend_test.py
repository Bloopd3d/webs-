import requests
import sys
import json
from datetime import datetime, timedelta

class LaCalandriaAPITester:
    def __init__(self, base_url="https://la-calandria.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.created_items = []  # Track created items for cleanup

    def run_test(self, name, method, endpoint, expected_status, data=None, auth_required=False):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and 'id' in response_data:
                        print(f"   Response ID: {response_data['id']}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Response text: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login with correct credentials"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "admin/login",
            200,
            data={"username": "admin", "password": "calandria2024"}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"   Token obtained: {self.token}")
            return True
        return False

    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        success, response = self.run_test(
            "Admin Login (Invalid)",
            "POST",
            "admin/login",
            401,
            data={"username": "wrong", "password": "wrong"}
        )
        return success

    def test_seed_database(self):
        """Test database seeding"""
        success, response = self.run_test(
            "Seed Database",
            "POST",
            "seed",
            200
        )
        return success

    def test_get_menu_all(self):
        """Test getting all menu items"""
        success, response = self.run_test(
            "Get All Menu Items",
            "GET",
            "menu",
            200
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} menu items")
            return True
        return False

    def test_get_menu_by_category(self):
        """Test getting menu items by category"""
        categories = ['Brunch', 'Sushi', 'Parrilla', 'Cafetería', 'Sin TACC']
        all_passed = True
        
        for category in categories:
            success, response = self.run_test(
                f"Get Menu - {category}",
                "GET",
                f"menu?categoria={category}",
                200
            )
            if success and isinstance(response, list):
                print(f"   Found {len(response)} items in {category}")
            else:
                all_passed = False
        
        return all_passed

    def test_create_menu_item(self):
        """Test creating a new menu item"""
        test_item = {
            "nombre": "Test Plato",
            "descripcion": "Plato de prueba para testing",
            "precio": 2500.0,
            "categoria": "Brunch",
            "imagen_url": "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
            "destacado": True,
            "sin_tacc": False
        }
        
        success, response = self.run_test(
            "Create Menu Item",
            "POST",
            "menu",
            200,
            data=test_item,
            auth_required=True
        )
        
        if success and 'id' in response:
            self.created_items.append(response['id'])
            return True
        return False

    def test_update_menu_item(self):
        """Test updating a menu item"""
        if not self.created_items:
            print("❌ No items to update - skipping test")
            return False
            
        item_id = self.created_items[0]
        update_data = {
            "precio": 3000.0,
            "destacado": False
        }
        
        success, response = self.run_test(
            "Update Menu Item",
            "PUT",
            f"menu/{item_id}",
            200,
            data=update_data,
            auth_required=True
        )
        return success

    def test_create_reservation(self):
        """Test creating a reservation"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        
        reservation_data = {
            "nombre_cliente": "Juan Pérez Test",
            "telefono": "2657123456",
            "fecha": tomorrow,
            "hora": "20:00",
            "cantidad_personas": 4
        }
        
        success, response = self.run_test(
            "Create Reservation",
            "POST",
            "reservations",
            200,
            data=reservation_data
        )
        
        if success and 'id' in response:
            self.created_items.append(f"reservation_{response['id']}")
            return True
        return False

    def test_get_reservations(self):
        """Test getting all reservations (admin only)"""
        success, response = self.run_test(
            "Get Reservations",
            "GET",
            "reservations",
            200,
            auth_required=True
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} reservations")
            return True
        return False

    def test_update_reservation_status(self):
        """Test updating reservation status"""
        # First create a reservation to update
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        
        reservation_data = {
            "nombre_cliente": "Test Update",
            "telefono": "2657999999",
            "fecha": tomorrow,
            "hora": "19:00",
            "cantidad_personas": 2
        }
        
        success, response = self.run_test(
            "Create Reservation for Update",
            "POST",
            "reservations",
            200,
            data=reservation_data
        )
        
        if not success or 'id' not in response:
            return False
            
        reservation_id = response['id']
        
        # Now update the status
        success, response = self.run_test(
            "Update Reservation Status",
            "PUT",
            f"reservations/{reservation_id}",
            200,
            data={"estado": "confirmada"},
            auth_required=True
        )
        return success

    def test_delete_menu_item(self):
        """Test deleting a menu item"""
        if not self.created_items:
            print("❌ No items to delete - skipping test")
            return False
            
        # Find a menu item ID (not reservation)
        menu_item_id = None
        for item in self.created_items:
            if not item.startswith('reservation_'):
                menu_item_id = item
                break
                
        if not menu_item_id:
            print("❌ No menu items to delete - skipping test")
            return False
            
        success, response = self.run_test(
            "Delete Menu Item",
            "DELETE",
            f"menu/{menu_item_id}",
            200,
            auth_required=True
        )
        return success

    def test_unauthorized_access(self):
        """Test accessing protected endpoints without auth"""
        endpoints = [
            ("menu", "POST", {"nombre": "test"}),
            ("reservations", "GET", None)
        ]
        
        all_passed = True
        for endpoint, method, data in endpoints:
            success, response = self.run_test(
                f"Unauthorized {method} {endpoint}",
                method,
                endpoint,
                401,
                data=data,
                auth_required=False  # Explicitly no auth
            )
            if not success:
                all_passed = False
                
        return all_passed

def main():
    print("🚀 Starting La Calandria API Tests")
    print("=" * 50)
    
    tester = LaCalandriaAPITester()
    
    # Test sequence
    tests = [
        ("Admin Login", tester.test_admin_login),
        ("Admin Login Invalid", tester.test_admin_login_invalid),
        ("Seed Database", tester.test_seed_database),
        ("Get All Menu", tester.test_get_menu_all),
        ("Get Menu by Category", tester.test_get_menu_by_category),
        ("Create Menu Item", tester.test_create_menu_item),
        ("Update Menu Item", tester.test_update_menu_item),
        ("Create Reservation", tester.test_create_reservation),
        ("Get Reservations", tester.test_get_reservations),
        ("Update Reservation Status", tester.test_update_reservation_status),
        ("Delete Menu Item", tester.test_delete_menu_item),
        ("Unauthorized Access", tester.test_unauthorized_access)
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            result = test_func()
            if not result:
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ Test {test_name} crashed: {str(e)}")
            failed_tests.append(test_name)
    
    # Print final results
    print(f"\n{'='*50}")
    print(f"📊 FINAL RESULTS")
    print(f"{'='*50}")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if failed_tests:
        print(f"\n❌ Failed tests:")
        for test in failed_tests:
            print(f"   - {test}")
    else:
        print(f"\n✅ All tests passed!")
    
    return 0 if len(failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())