import random

# This class generates random traffic objects with the following properties: id, type, speed
# The type can be one of the following: car, truck, motorcycle

#TODO This needs to be taylored to the specific needs of the project

class TrafficGenerator:
    def generate_traffic(self, num_objects):
        traffic = []
        for _ in range(num_objects):
            object = {
                'id': random.randint(1, 100),
                'type': random.choice(['car', 'truck', 'motorcycle']),
                'speed': random.randint(30, 100),
            }
            traffic.append(object)
        return traffic

# Example usage
generator = TrafficGenerator()
traffic = generator.generate_traffic(10)
print(traffic)
