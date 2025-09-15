from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.db.models import Q, Avg
from django.core.paginator import Paginator
from .models import Category, Event, Review, Favorite, RSVP, Notification, Profile
from .forms import EventForm, ReviewForm, UserRegisterForm, ProfileForm

# -----------------------------
# Event List
# -----------------------------
def event_list(request):
    categories = Category.objects.all()
    events = Event.objects.all()
    query = request.GET.get('q')

    # Search
    if query:
        events = events.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(location__icontains=query)
        )

    # Filters
    category_id = request.GET.get('category')
    location = request.GET.get('location')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    min_rating = request.GET.get('min_rating')

    if category_id:
        events = events.filter(category_id=category_id)
    if location:
        events = events.filter(location__icontains=location)
    if min_price:
        events = events.filter(price__gte=min_price)
    if max_price:
        events = events.filter(price__lte=max_price)
    if min_rating:
        events = events.annotate(avg_rating=Avg('reviews__rating')).filter(avg_rating__gte=min_rating)

    # Pagination
    paginator = Paginator(events, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
        'categories': categories,
    }
    return render(request, 'events/event_list.html', context)


# -----------------------------
# Event Detail
# -----------------------------
def event_detail(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    reviews = event.reviews.all()
    is_favorited = False
    has_rsvped = False

    if request.user.is_authenticated:
        is_favorited = Favorite.objects.filter(user=request.user, event=event).exists()
        has_rsvped = RSVP.objects.filter(user=request.user, event=event).exists()

    review_form = ReviewForm()

    if request.method == 'POST' and request.user.is_authenticated:
        # Add Review
        if 'review' in request.POST:
            review_form = ReviewForm(request.POST)
            if review_form.is_valid():
                review = review_form.save(commit=False)
                review.event = event
                review.user = request.user
                review.save()
                return redirect('event_detail', event_id=event.id)

        # Toggle Favorite
        elif 'favorite' in request.POST:
            fav, created = Favorite.objects.get_or_create(user=request.user, event=event)
            if not created:
                fav.delete()
            return redirect('event_detail', event_id=event.id)

        # RSVP
        elif 'rsvp' in request.POST:
            guests = request.POST.get('guests', 1)
            rsvp, _ = RSVP.objects.get_or_create(user=request.user, event=event)
            rsvp.guests = guests
            rsvp.save()
            return redirect('event_detail', event_id=event.id)

    context = {
        'event': event,
        'reviews': reviews,
        'review_form': review_form,
        'is_favorited': is_favorited,
        'has_rsvped': has_rsvped,
    }
    return render(request, 'events/event_detail.html', context)


# -----------------------------
# Create Event
# -----------------------------
@login_required
def event_create(request):
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user
            event.save()
            return redirect('event_detail', event_id=event.id)
    else:
        form = EventForm()
    return render(request, 'events/event_create.html', {'form': form})


# -----------------------------
# Notifications
# -----------------------------
@login_required
def notifications(request):
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'events/notifications.html', {'notifications': notifications})


# -----------------------------
# User Registration
# -----------------------------
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('profile_edit')
    else:
        form = UserRegisterForm()
    return render(request, 'registration/register.html', {'form': form})


# -----------------------------
# Profile Edit
# -----------------------------
@login_required
def profile_edit(request):
    profile = get_object_or_404(Profile, user=request.user)
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('event_list')
    else:
        form = ProfileForm(instance=profile)
    return render(request, 'events/profile_edit.html', {'form': form})
