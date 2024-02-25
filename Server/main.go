package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

var client = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "",
	DB:       0,
})

func saveHighScore(c *gin.Context) {
	// Parse the request body to get username and high score
	type RequestBody struct {
		Username  string `json:"username"`
		HighScore int    `json:"highscore"`
	}
	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Save the high score in Redis
	key := fmt.Sprintf("highscore:%s", requestBody.Username)
	err := client.Set(context.Background(), key, requestBody.HighScore, 0).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save high score"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "High score saved successfully"})
}

func getAllHighScores(c *gin.Context) {

	type HighScore struct {
		Username  string `json:"username"`
		HighScore int    `json:"highscore"`
	}
	// Get all keys matching the highscore pattern
	keys, err := client.Keys(context.Background(), "highscore:*").Result()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve high scores"})
		return
	}

	// Initialize a slice to store high scores
	var scores []HighScore

	// Iterate over each key and retrieve the high score
	for _, key := range keys {
		username := key[len("highscore:"):]
		val, err := client.Get(context.Background(), key).Result()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve high score"})
			return
		}
		highScore, err := strconv.Atoi(val)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to convert high score to integer"})
			return
		}
		scores = append(scores, HighScore{Username: username, HighScore: highScore})
	}

	// Sort the scores slice in descending order based on high score
	sort.Slice(scores, func(i, j int) bool {
		return scores[i].HighScore > scores[j].HighScore
	})

	c.JSON(http.StatusOK, scores)
}

func getHighScore(c *gin.Context) {
	username := c.Param("username")
	key := fmt.Sprintf("highscore:%s", username)

	// Retrieve the high score from Redis
	val, err := client.Get(context.Background(), key).Result()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "High score not found"})
		return
	}

	// Convert the high score to an integer
	highScore, err := strconv.Atoi(val)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to convert high score to integer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"highscore": highScore})
}

func main() {

	router := gin.New()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	router.POST("/highscore", saveHighScore)
	router.GET("/highscore/:username", getHighScore)
	router.GET("/highscores", getAllHighScores)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if err := router.Run(":" + port); err != nil {
		log.Panicf("error: %s", err)
	}

}
