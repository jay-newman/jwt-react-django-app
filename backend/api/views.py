
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, PetProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from api.models import PetProfile

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


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getPetProfile(request):
    
        try:
            if request.method == 'GET':

                data = PetProfile.objects.get(user=request.user)
                serializer = PetProfileSerializer(data)

                return Response({'response': serializer.data}, status.HTTP_200_OK)
            
            elif request.method == 'PUT':
                

                print(request.data)

                #Fetch user pet profile from db
                data = PetProfile.objects.get(user=request.user)
                
                #Update values and save
                data.pet_name = request.data['pet_name']
                data.pet_type = request.data['pet_type']
                data.save()
                
                return Response({}, status.HTTP_200_OK)

        except:
        
            return Response({}, status.HTTP_400_BAD_REQUEST)
