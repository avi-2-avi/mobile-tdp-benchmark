package pe.edu.upc.composetdp

import android.os.Bundle
import android.os.Debug
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.withFrameNanos
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.android.awaitFrame
import kotlin.random.Random

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

@Composable
fun MyApp() {
    var circleCount by remember { mutableStateOf(0) }
    var textFieldValue by remember { mutableStateOf(TextFieldValue("")) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        BasicTextField(
            value = textFieldValue,
            onValueChange = { newValue ->
                textFieldValue = newValue
                circleCount = newValue.text.toIntOrNull() ?: 0
            },
            textStyle = TextStyle(fontSize = 18.sp, color = Color.Black),
            modifier = Modifier
                .background(Color.White)
                .padding(16.dp)
                .fillMaxWidth()
                .border(1.dp, Color.Gray)
                .padding(8.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        Box(modifier = Modifier.fillMaxSize()) {
            if (circleCount > 0) {
                MovingCircles(circleCount)
            }
            FpsAndResourceMonitor()
        }
    }
}

data class CircleState(
    var x: Float,
    var y: Float,
    var dx: Float,
    var dy: Float,
    var radius: Float
)

@Composable
fun MovingCircles(circleCount: Int) {
    val circles = remember { mutableStateListOf<CircleState>() }

    // Initialize circles
    LaunchedEffect(circleCount) {
        circles.clear()
        val radius = 16f
        repeat(circleCount) {
            circles.add(
                CircleState(
                    x = Random.nextFloat() * 300f, // Initial x position
                    y = Random.nextFloat() * 600f, // Initial y position
                    dx = Random.nextFloat() * 4f - 2f, // Random x velocity
                    dy = Random.nextFloat() * 4f - 2f, // Random y velocity
                    radius = radius
                )
            )
        }
    }

    LaunchedEffect(Unit) {
        while (true) {
            withFrameNanos {
                circles.forEach { circle ->
                    // Update positions
                    circle.x += circle.dx
                    circle.y += circle.dy

                    // Check for collision with walls
                    if (circle.x < 0 || circle.x > 2000) circle.dx = -circle.dx
                    if (circle.y < 0 || circle.y > 2000) circle.dy = -circle.dy
                }
            }
        }
    }

    Canvas(modifier = Modifier.fillMaxSize()) {
        circles.forEach { circle ->
            drawCircle(
                color = Color.Red,
                radius = circle.radius,
                center = androidx.compose.ui.geometry.Offset(
                    x = circle.x,
                    y = circle.y
                )
            )
        }
    }
}

@Composable
fun FpsAndResourceMonitor() {
    var fps by remember { mutableStateOf(0) }
    var lastFrameTime by remember { mutableStateOf(System.nanoTime()) }
    var frameCount by remember { mutableStateOf(0) }

    var cpuUsage by remember { mutableStateOf(0f) }
    var memoryUsage by remember { mutableStateOf(0L) }

    LaunchedEffect(Unit) {
        while (true) {
            awaitFrame()
            val currentTime = System.nanoTime()
            frameCount++
            if (currentTime - lastFrameTime >= 1_000_000_000) {
                fps = frameCount
                frameCount = 0
                lastFrameTime = currentTime

                // Update CPU and memory usage
                cpuUsage = Debug.threadCpuTimeNanos().toFloat() / 1_00_000_000_000
                memoryUsage = Debug.getNativeHeapAllocatedSize()
            }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .background(Color.Black.copy(alpha = 0.5f)),
        contentAlignment = Alignment.TopCenter
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "FPS: $fps",
                style = MaterialTheme.typography.bodyLarge.copy(fontSize = 24.sp),
                color = Color.White
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "CPU Usage: %.2f%%".format(cpuUsage * 100),
                style = MaterialTheme.typography.bodyLarge.copy(fontSize = 16.sp),
                color = Color.White
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Memory Usage: %.2f MB".format(memoryUsage / (1024f * 1024f)),
                style = MaterialTheme.typography.bodyLarge.copy(fontSize = 16.sp),
                color = Color.White
            )
        }
    }
}