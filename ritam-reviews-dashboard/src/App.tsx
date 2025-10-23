import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface Review {
  id: string
  platform: 'google' | 'makemytrip' | 'booking' | 'tripadvisor'
  guestName: string
  rating: number
  reviewSnippet: string
  fullReview: string
  sentiment: 'positive' | 'negative' | 'neutral'
  date: string
  aiAnalysis: {
    overallSentiment: string
    keyPoints: string[]
    suggestedResponse: string
  }
}

const mockReviews: Review[] = [
  {
    id: '1',
    platform: 'google',
    guestName: 'Priya S.',
    rating: 4,
    reviewSnippet: 'Great location and friendly staff. The room was clean and comfortable...',
    fullReview: 'Great location and friendly staff. The room was clean and comfortable. The breakfast buffet had good variety. Only minor issue was the WiFi speed could be better. Overall, a pleasant stay and would recommend to others visiting Mumbai.',
    sentiment: 'positive',
    date: '2 days ago',
    aiAnalysis: {
      overallSentiment: 'Positive with minor concerns',
      keyPoints: ['Excellent location', 'Friendly staff', 'Clean rooms', 'Good breakfast', 'WiFi needs improvement'],
      suggestedResponse: 'Thank you Priya for your wonderful review! We are delighted to hear you enjoyed our location, staff, and breakfast. We apologize for the WiFi issues and are working on upgrading our internet infrastructure. We look forward to welcoming you again!'
    }
  },
  {
    id: '2',
    platform: 'makemytrip',
    guestName: 'Rajesh K.',
    rating: 5,
    reviewSnippet: 'Excellent service! The staff went above and beyond to make our stay memorable...',
    fullReview: 'Excellent service! The staff went above and beyond to make our stay memorable. The room was spacious and well-maintained. The rooftop restaurant has amazing views. Highly recommended for families visiting Jaipur.',
    sentiment: 'positive',
    date: '3 days ago',
    aiAnalysis: {
      overallSentiment: 'Highly Positive',
      keyPoints: ['Outstanding service', 'Spacious rooms', 'Great rooftop restaurant', 'Family-friendly'],
      suggestedResponse: 'Dear Rajesh, thank you so much for this glowing review! Our team is thrilled to know we made your family stay memorable. We hope to host you again soon!'
    }
  },
  {
    id: '3',
    platform: 'booking',
    guestName: 'Anjali M.',
    rating: 2,
    reviewSnippet: 'Disappointed with the room condition. The AC was not working properly...',
    fullReview: 'Disappointed with the room condition. The AC was not working properly and it took hours for maintenance to respond. The bathroom had some cleanliness issues. The front desk staff was apologetic but the overall experience was below expectations for the price paid.',
    sentiment: 'negative',
    date: '5 days ago',
    aiAnalysis: {
      overallSentiment: 'Negative - Maintenance Issues',
      keyPoints: ['AC malfunction', 'Slow maintenance response', 'Cleanliness concerns', 'Price-value mismatch'],
      suggestedResponse: 'Dear Anjali, we sincerely apologize for the issues you experienced during your stay. This is not the standard we strive for. We have addressed the AC and cleanliness concerns with our maintenance and housekeeping teams. We would like to make this right - please contact us directly so we can offer you a complimentary stay.'
    }
  },
  {
    id: '4',
    platform: 'tripadvisor',
    guestName: 'Vikram P.',
    rating: 3,
    reviewSnippet: 'Average experience. The location is good but the amenities need updating...',
    fullReview: 'Average experience. The location is good but the amenities need updating. The gym equipment is old and limited. The pool area is nice but could be cleaner. Staff was helpful. Decent for a short business trip but would look for other options for leisure travel.',
    sentiment: 'neutral',
    date: '1 week ago',
    aiAnalysis: {
      overallSentiment: 'Neutral - Mixed Feedback',
      keyPoints: ['Good location', 'Outdated gym equipment', 'Pool maintenance needed', 'Helpful staff', 'Suitable for business'],
      suggestedResponse: 'Thank you for your feedback, Vikram. We appreciate your honest review. We are currently planning upgrades to our gym facilities and have increased our pool maintenance schedule. We hope to welcome you back and provide an improved experience.'
    }
  },
  {
    id: '5',
    platform: 'google',
    guestName: 'Meera D.',
    rating: 5,
    reviewSnippet: 'Absolutely loved our stay! The hospitality was top-notch...',
    fullReview: 'Absolutely loved our stay! The hospitality was top-notch. The room had a beautiful view of the city. The restaurant served delicious authentic Indian cuisine. Special mention to the concierge who helped us plan our sightseeing. Will definitely return!',
    sentiment: 'positive',
    date: '1 week ago',
    aiAnalysis: {
      overallSentiment: 'Highly Positive',
      keyPoints: ['Excellent hospitality', 'Beautiful views', 'Great restaurant', 'Helpful concierge service'],
      suggestedResponse: 'Dear Meera, we are overjoyed to read your wonderful review! Our entire team, especially our concierge, is delighted to have made your stay special. We cannot wait to welcome you back!'
    }
  },
  {
    id: '6',
    platform: 'booking',
    guestName: 'Arjun T.',
    rating: 4,
    reviewSnippet: 'Good value for money. Clean rooms and courteous staff...',
    fullReview: 'Good value for money. Clean rooms and courteous staff. The breakfast spread was impressive with both Indian and continental options. The only downside was the noise from the street at night. Overall, a solid choice for budget-conscious travelers.',
    sentiment: 'positive',
    date: '2 weeks ago',
    aiAnalysis: {
      overallSentiment: 'Positive with minor concern',
      keyPoints: ['Good value', 'Clean rooms', 'Excellent breakfast variety', 'Street noise issue'],
      suggestedResponse: 'Thank you Arjun for your positive review! We are glad you enjoyed our breakfast and found good value. We apologize for the street noise - we do have quieter rooms available on higher floors. Please request these during your next booking!'
    }
  },
  {
    id: '7',
    platform: 'makemytrip',
    guestName: 'Kavita R.',
    rating: 1,
    reviewSnippet: 'Very poor experience. The room was not ready even after check-in time...',
    fullReview: 'Very poor experience. The room was not ready even after check-in time. Had to wait for 2 hours in the lobby. The room given was different from what was booked. No proper explanation or compensation offered. Would not recommend.',
    sentiment: 'negative',
    date: '2 weeks ago',
    aiAnalysis: {
      overallSentiment: 'Highly Negative - Service Failure',
      keyPoints: ['Late check-in', 'Long wait time', 'Wrong room type', 'Poor communication', 'No compensation'],
      suggestedResponse: 'Dear Kavita, we deeply apologize for this unacceptable experience. This is a serious service failure on our part. Our management team would like to speak with you directly to understand what happened and make amends. Please contact us at your earliest convenience. We are committed to ensuring this never happens again.'
    }
  },
  {
    id: '8',
    platform: 'tripadvisor',
    guestName: 'Sanjay B.',
    rating: 4,
    reviewSnippet: 'Pleasant stay with excellent customer service. The staff remembered our preferences...',
    fullReview: 'Pleasant stay with excellent customer service. The staff remembered our preferences from our previous visit which was a nice touch. The room was well-appointed and comfortable. The spa services were relaxing. Would have given 5 stars but the checkout process was a bit slow.',
    sentiment: 'positive',
    date: '3 weeks ago',
    aiAnalysis: {
      overallSentiment: 'Positive with minor process issue',
      keyPoints: ['Excellent personalized service', 'Comfortable rooms', 'Good spa', 'Slow checkout'],
      suggestedResponse: 'Thank you Sanjay for being a returning guest! We are thrilled our team remembered your preferences. We apologize for the slow checkout and are working on streamlining the process. Looking forward to your next visit!'
    }
  }
]

const platformColors = {
  google: 'bg-blue-100 text-blue-800',
  makemytrip: 'bg-red-100 text-red-800',
  booking: 'bg-blue-100 text-blue-800',
  tripadvisor: 'bg-green-100 text-green-800'
}

const platformNames = {
  google: 'Google',
  makemytrip: 'MakeMyTrip',
  booking: 'Booking.com',
  tripadvisor: 'TripAdvisor'
}

function App() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(mockReviews[0])

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-green-600" />
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800'
      case 'negative':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Ritam Reviews Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Unified review management for hotel managers</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-2 px-6 pb-4">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      onClick={() => setSelectedReview(review)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedReview?.id === review.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{review.guestName}</span>
                          <Badge className={platformColors[review.platform]} variant="secondary">
                            {platformNames[review.platform]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {getSentimentIcon(review.sentiment)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{review.reviewSnippet}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {selectedReview ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedReview.guestName}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          {renderStars(selectedReview.rating)}
                          <span className="text-sm text-gray-500">{selectedReview.date}</span>
                        </div>
                      </div>
                      <Badge className={platformColors[selectedReview.platform]} variant="secondary">
                        {platformNames[selectedReview.platform]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Full Review</h3>
                        <p className="text-gray-900 leading-relaxed">{selectedReview.fullReview}</p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Sentiment:</span>
                        <Badge className={getSentimentColor(selectedReview.sentiment)} variant="secondary">
                          <span className="flex items-center gap-1">
                            {getSentimentIcon(selectedReview.sentiment)}
                            <span className="capitalize">{selectedReview.sentiment}</span>
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-purple-600">✨</span>
                      AI Sentiment Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Overall Sentiment</h3>
                        <p className="text-gray-900">{selectedReview.aiAnalysis.overallSentiment}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Points</h3>
                        <ul className="space-y-1">
                          {selectedReview.aiAnalysis.keyPoints.map((point, index) => (
                            <li key={index} className="text-sm text-gray-900 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggested Response</h3>
                        <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                          {selectedReview.aiAnalysis.suggestedResponse}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Use This Response
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Edit & Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <p className="text-gray-500">Select a review to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
