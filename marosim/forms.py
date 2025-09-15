from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Event, Review, Profile

# -----------------------------
# Event Form
# -----------------------------
class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = [
            'title',
            'description',
            'price',
            'budget',
            'location',
            'image',
            'video',
            'category'
        ]
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Event title'}),
            'description': forms.Textarea(attrs={'class': 'form-textarea', 'rows': 5, 'placeholder': 'Describe your event...'}),
            'price': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'Price'}),
            'budget': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'Budget'}),
            'location': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Location'}),
            'category': forms.Select(attrs={'class': 'form-select'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-file'}),
            'video': forms.ClearableFileInput(attrs={'class': 'form-file'}),
        }

# -----------------------------
# Review Form
# -----------------------------
class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'comment']
        widgets = {
            'rating': forms.Select(attrs={'class': 'form-select'}),
            'comment': forms.Textarea(attrs={'class': 'form-textarea', 'rows': 3, 'placeholder': 'Write your review...'}),
        }

# -----------------------------
# User Registration Form
# -----------------------------
class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'Email'})
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Username'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-input', 'placeholder': 'Password'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-input', 'placeholder': 'Confirm Password'}),
        }

# -----------------------------
# Profile Form
# -----------------------------
class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['is_provider', 'bio', 'contact_email', 'phone']
        widgets = {
            'is_provider': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
            'bio': forms.Textarea(attrs={'class': 'form-textarea', 'rows': 3, 'placeholder': 'Write something about yourself...'}),
            'contact_email': forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'Contact Email'}),
            'phone': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Phone number'}),
        }
