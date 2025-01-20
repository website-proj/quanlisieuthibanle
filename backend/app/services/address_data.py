import random


class District:
    def __init__(self, district_id, district_name):
        self.district_id = district_id
        self.district_name = district_name
    def read_district_data(self):
        result = []
        file_path = r"D:\code\python\fastapi-base\database\districts.txt"
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()[1:]
            for line in lines:
                line = [str(i) for i in line.strip().split(",")]
                district_id = line[0]
                district_name = line[1]
                district = District(district_id, district_name)
                result.append(district)
        return result
class Ward:
    def __init__(self , ward_id=None, ward_name=None , district_id =None, district_name=None):
        self.ward_id = ward_id
        self.ward_name = ward_name
        self.district_id = district_id
        self.district_name = district_name
    def read_ward_data(self):
        result = []
        file_path = r"D:\code\python\fastapi-base\database\wards.txt"
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()[1:]
            for line in lines:
                line = [str(i) for i in line.strip().split(",")]
                newline = []
                for i in line :
                    a = ""
                    for j in i :
                        if j == "'":
                           continue
                        a += j
                    newline.append(a)
                ward_id = newline[0]
                ward_name = newline[1]
                district_id = newline[2]
                district_name = newline[3]
                ward = Ward(ward_id, ward_name, district_id, district_name)
                result.append(ward)
        return result
    def __str__(self):
        return f"Ward ID: {self.ward_id}, Name: {self.ward_name}, District ID: {self.district_id}, District Name: {self.district_name}"

class Street:
    def __init__(self , street_id = None , street_name = None, ward_id = None):
        self.street_id = street_id
        self.street_name = street_name
        self.ward_id = ward_id
    def read_street_data(self):
        result = []
        file_path = r"D:\code\python\fastapi-base\database\street.txt"
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()[1:]
            for line in lines:
                line = [str(i) for i in line.strip().split(",")]
                newline = []
                for i in line:
                    a = ""
                    for j in i:
                        if j == "'":
                            continue
                        a += j
                    newline.append(a)
                street_id = newline[0]
                street_name = newline[1]
                ward_id = newline[2]
                street = Street(street_id, street_name, ward_id)
                result.append(street)
        return result
class AddressData:

    def __init__(self ,house_number =None , street_name = None , ward_name = None , district_name  = None ):
        self.house_number = house_number
        self.street_name = street_name
        self.ward_name = ward_name
        self.district_name = district_name
        self.city = "Hà Nội"
    def random_address(self):
        house_number = random.randint(1,1000)
        street_obj  = Street()
        streets = street_obj.read_street_data()
        street = random.choice(streets)
        ward_id = street.ward_id
        ward_obj = Ward()
        wards = ward_obj.read_ward_data()
        for ward in wards:
            if ward.ward_id == ward_id:
                ward_obj = ward
                break
        street_name = street.street_name
        ward_name = ward_obj.ward_name
        district_name = ward_obj.district_name
        address = AddressData(house_number, street_name, ward_name, district_name)
        return address

    def __str__(self):
        return f"{self.house_number}, {self.street_name}, {self.ward_name}, {self.district_name}, {self.city}"
    def main(self):
        address = self.random_address()
        print(address)
if __name__ == '__main__':
    # ward = Ward()
    # wards = ward.read_ward_data()
    # for i in wards:
    #     print(i)
    address = AddressData()
    address.main()
