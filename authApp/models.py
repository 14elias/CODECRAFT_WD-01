from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class MyUserManager(BaseUserManager):
    def create_user(self, email,password=None,*args,**kwargs):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """ 
        if not email:
            raise ValueError("Users must have an email address")
        email=self.normalize_email(email)
        email=email.lower()
        user = self.model(
            email=email,
            *args,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None,*args,**kwargs):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            *args,
            **kwargs
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    username=models.CharField(max_length=100,unique=True)
    first_name=models.CharField(max_length=50,blank=True,null=True )
    last_name=models.CharField(max_length=50,blank=True,null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD="username"
    objects = MyUserManager()

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.email
