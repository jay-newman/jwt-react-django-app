
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
        '/api/petprofile',
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPetProfile(request):
    
        try:
            if request.method == 'GET':
                user = request.user
                
                # data = f'{PetProfile.objects.filter(user=user)}'
                # data = [
                #     {'pet_name': PetProfile.objects.get(user=user).pet_name,
                #      'pet_type': PetProfile.objects.get(user=user).pet_type}
                # ]

                data = PetProfile.objects.get(user=user)
                serializer = PetProfileSerializer(data)

                print(data)

                return Response({'response': serializer.data}, status.HTTP_200_OK)
        except:
            return Response({}, status.HTTP_400_BAD_REQUEST)
        
 
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def getPetProfile(request):
#     try:
#         if request.method == 'PUT':
            
#             user = request.user
#             petProfile = PetProfile.objects.filter(user=user)
#             serializer = PetProfileSerializer


#     except:
#         return Response({}, status.HTTP_400_BAD_REQUEST)

