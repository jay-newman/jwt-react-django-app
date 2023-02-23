
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, serializers
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, PetProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from api.models import PetProfile  
from rest_framework.renderers import JSONRenderer


MaxPets = 3

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/petprofile/',
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'POST'])
@permission_classes([IsAuthenticated])
def getPetProfile(request):
        
    
        try:
            if request.method == 'GET':
                
                # profileList = PetProfile.objects.filter(user=request.user).values()
                profileList = list(PetProfile.objects.filter(user=request.user).values())


                print(profileList)
                serializer = PetProfileSerializer(profileList, many=True)  
                # print("Profile List")
                # print(profileList)

                
     
    


                json = JSONRenderer().render(serializer.data)
                
                return Response({'response': {json}}, status.HTTP_200_OK)

                # return Response({"response": {profile['id']: profile for profile in serializer.data}})
                # return JsonResponse({"profile": profileList}, safe=False, status=status.HTTP_200_OK)
            # Create new pet object
            elif request.method == 'POST':

                print("in post pets")
                # User can have a max of three pets
                if PetProfile.objects.filter(user=request.user).count() <= MaxPets:
                    # Create New Pet
                    # Probably should add some validation here or something
                    petProfiles = PetProfile.objects.filter(user=request.user)
                    print(petProfiles)
                    serializer = PetProfileSerializer(petProfiles, many=True)

                    json = JSONRenderer().render(serializer.data)
                
                    
                    return Response({'response': {json}} ,status.HTTP_200_OK)
      
            elif request.method == 'PUT':
                

                # print(request.data)

                #Fetch user pet profile from db
                data = PetProfile.objects.get(user=request.user)
                
                #Update values and save
                data.pet_name = request.data['pet_name']
                data.pet_type = request.data['pet_type']
                data.save()

                #Get new info
                data = PetProfile.objects.get(user=request.user)
                serializer = PetProfileSerializer(data)
                
                return Response({'response': serializer.data}, status.HTTP_201_OK)
            

        except:
        
            return Response({}, status.HTTP_400_BAD_REQUEST)
        
def get_json_list(query_set):
    list_objects = []
    for obj in query_set:
        dict_obj = {}
        for field in obj._meta.get_fields():
            try:
                if field.many_to_many:
                    dict_obj[field.name] = get_json_list(getattr(obj, field.name).all())
                    continue
                dict_obj[field.name] = getattr(obj, field.name)
            except AttributeError:
                continue
        list_objects.append(dict_obj)
    return list_objects
